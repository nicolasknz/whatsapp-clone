import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormGroup,
    IconButton,
    Input,
    Modal,
    Slide,
    Slider,
} from "@material-ui/core";
import styled from "styled-components";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import Chat from "./Chat";

import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import React, { forwardRef, useState } from "react";
import { TransitionProps } from "@material-ui/core/transitions/transition";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const userChatRef = db
        .collection("chats")
        .where("users", "array-contains", user.email);
    const [chatsSnapshot, loading, error] = useCollection(userChatRef);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailInput, setEmailInput] = useState("");

    const createChat = () => {
        console.log("submit");
        if (!emailInput) return null;

        let chatExists = chatAlreadyExists(emailInput);

        if (
            EmailValidator.validate(emailInput) &&
            !chatExists &&
            emailInput !== user.email
        ) {
            // Add chat to the DB chats collection
            db.collection("chats").add({
                users: [user.email, emailInput],
            });
        }
    };

    const chatAlreadyExists = (recipientEmail) => {
        return !!chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user == recipientEmail)
                    ?.length > 0
        );
    };

    return (
        <Container>
            <Dialog
                open={isModalOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => {}}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    New chat
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Please enter and email adress for the user you wish to
                        chat with
                        <FormGroup onSubmit={createChat}>
                            <Input
                                onChange={(e) => setEmailInput(e.target.value)}
                            />
                        </FormGroup>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        color="primary"
                    >
                        Disagree
                    </Button>
                    <Button
                        onClick={() => {
                            setIsModalOpen(!isModalOpen);
                            createChat();
                        }}
                        color="primary"
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <Header>
                <UserAvatar
                    src={user.photoURL}
                    onClick={() => auth.signOut()}
                />

                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>

            <SidebarButton onClick={() => setIsModalOpen(!isModalOpen)}>
                Start a new chat
            </SidebarButton>

            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    );
};

export default Sidebar;

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 300px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;

const Header = styled.div`
    display: flex;
    position: sticky; // To stick when we scroll it
    top: 0;
    background-color: white;
    z-index: 1; // To be on top of everything else when we scroll
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div``;
