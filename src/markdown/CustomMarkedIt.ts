import MarkdownIt from "markdown-it"

export class CustomMarkedownParser
{
    private markedown : MarkdownIt;

    constructor()
    {
        this.markedown = new MarkdownIt();
    }

    parse = (markDownSource : string) : string =>
    {
        return this.markedown.render(markDownSource);
    }
}