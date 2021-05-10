import { createGlobalStyle } from "styled-components";
import { Theme } from "./styled";

export default createGlobalStyle<Theme>`
* {
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body {
  background:${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font: 400 16px Roboto, sans-serif;
}
`
