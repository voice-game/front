import styled from "styled-components";

const Canvas = styled.canvas`
  display: block;
  margin-top: ${(props) => (props.margin && props.margin[0]) || "0"};
  margin-right: ${(props) => (props.margin && props.margin[1]) || "0"};
  margin-bottom: ${(props) => (props.margin && props.margin[2]) || "0"};
  margin-left: ${(props) => (props.margin && props.margin[3]) || "0"};
  border: 1px solid black;
  background-image: ${(props) => `url(${props.bgImage})`};
  background-size: contain;
`;

export default Canvas;
