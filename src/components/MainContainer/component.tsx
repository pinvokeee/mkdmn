import "./style.css";

export const MainContainer = (props : any) =>
{
    return (
        <div className="content">{props.children}</div>
    );
}