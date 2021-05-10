import { Circle } from "better-react-spinkit";

const Loading = () => {
    return (
        <center
            style={{ display: "grid", placeItems: "center", height: "100vh" }}
        >
            <div>
                <img
                    src="https://imbrizi.com.br/wp-content/uploads/2019/07/whatsapp-icon-logo.png"
                    alt=""
                    style={{ marginBottom: 10 }}
                    height={200}
                />
                <Circle color="#3CBC28" size={60} />
            </div>
        </center>
    );
};

export default Loading;

// TODO: Change inline CSS, we use style inline css here because if we use styled components, an additional step is gonna be needed because of SSR.
