import { Container } from "@mui/system";
import "./style.css";

function MainContainer(props : any)
{
    return (
        <Container className="content">{props.children}</Container>
    );
}

export default MainContainer;