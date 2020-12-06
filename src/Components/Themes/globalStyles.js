import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  header{
      background:${({theme})=>theme.headerBackground}
  }
  ul{
     background:${({theme})=>theme.headerBackground};

  }
  button{
    background:${({theme})=>theme.headerBackground};
 }
 a{
  text-decoration-color:${({theme})=>theme.text}
 }
  `