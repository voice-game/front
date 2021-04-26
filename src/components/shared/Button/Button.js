import styled from "styled-components";

const Button = styled.button`
  margin-top: ${(props) => (props && props.margin[0]) || "0px"};
  margin-right: ${(props) => (props && props.margin[1]) || "0px"};
  margin-bottom: ${(props) => (props && props.margin[2]) || "0px"};
  margin-left: ${(props) => (props && props.margin[3]) || "0px"};
  padding: 10px 20px;
  border: 3px solid black;
  background-color: ${(props) => props.bgColor || "#f1c40f"};
  font-weight: ${(props) => props.fontWeight || "400"};
  font-size: ${(props) => props.fontSize || "1.2rem"};
  color: black;
  text-transform: uppercase;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
`;

export default Button;
