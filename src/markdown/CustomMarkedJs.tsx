import { marked } from "marked";

export class CustomMarkedJs
{
    private renderer: marked.Renderer<never>;

    constructor()
    {
        this.renderer = new marked.Renderer();

        this.renderer.code = (text, lang) =>
        {
            return `<pre>${text}</pre>`;
            // return `<pre class="${lang}"><code>${text}</code></pre>`;
        }
    
        this.renderer.heading = (text, level, raw) =>
        {
            const regex = /{{(?<NAME>.+?)}}/;
            const match   = raw.match(regex);
            const name = match && match.groups ? match.groups["NAME"] : "";
    
            if (name.length == 0) 
            {
                return `<h${level}><a id="${text}">${text}</a></h${level}>\n`;
            }
    
            const source = text.replace(regex, '').replace(/\s{2}/g, '<br>');
            return `<div class="note ${name}">${source}</div>`;
        }
    
        this.renderer.strong = (text) =>
        {
            const regex = /{{(?<DESCRIPTION>.+?)}}/;
            const match   = text.match(regex);
            const description = match && match.groups ? match.groups["DESCRIPTION"] : "";
    
            if (description.length == 0) return `<b>${text}</b>`
    
            // const text = text.replace(regex, '').replace(/\s{2}/g, '<br>');
            
            return `<div class="tooltip">${text.replace(regex, '')}<div class="description">${description}</div></div>`;
        }
    }

    parse = (markDownSource : string) : string =>
    {
        const s = marked.parse(markDownSource, { renderer: this.renderer });        
        if (s == null) return "";
        return s;
    }
}