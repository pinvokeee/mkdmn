import { marked, Tokenizer } from "marked";

export class CustomMarkedJs
{
    // private renderer: marked.Renderer<never>;
    // private tokenizer : any;

    constructor()
    {
        const renderer = new marked.Renderer();


        
        const ext : (marked.TokenizerExtension | marked.RendererExtension | (marked.TokenizerExtension & marked.RendererExtension)) = 
        {
            name: "note",
            level: "block",
            start : (src : string) => src.match(/:::note/)?.index,

            tokenizer(src: string, tokens : marked.Token[])
            {
                const match = src.match(/^:::note\s+(?<TYPE>.+?)[\r\n](?<TEXT>(.|\r|\n)+?)[\r\n]*:::[\r\n]*/);

                if (match && match.groups)
                {
                    const token = 
                    {
                        type: "note",
                        raw: match[0],
                        text: match?.groups["TEXT"],
                        noteType: match.groups["TYPE"],
                        tokens: [],
                    }

                    this.lexer.blockTokens(token.text, token.tokens);

                    return token;
                }
            },

            renderer(token : any) 
            {
                console.log(token);
                return `<div class="note ${token.noteType}">${this.parser.parse(token.tokens)}\n</div>`; // parseInline to turn child tokens into HTML
            }
        }

        renderer.code = (text, lang) =>
        {
            return `<pre>${text}</pre>`;
            // return `<pre class="${lang}"><code>${text}</code></pre>`;
        }

        renderer.link = (href : string, title : string, text : string) =>
        {
            console.log(href, title, text);
            if (!href.startsWith("#")) return `<a href=${href}>${text}</a>`;

            return `<a href=#${encodeURI(href.substring(1, href.length))}>${text}</a>`;
        }
    
        renderer.heading = (text, level, raw) =>
        {
            return `<h${level}><a id="${encodeURI(text)}">${text}</a></h${level}>\n`;

            // const regex = /{{(?<NAME>.+?)}}/;
            // const match   = raw.match(regex);
            // const name = match && match.groups ? match.groups["NAME"] : "";
    
            // if (name.length == 0) 
            // {
                // return `<h${level}><a id="${text}">${text}</a></h${level}>\n`;
            // }
    
            // const source = text.replace(regex, '').replace(/\s{2}/g, '<br>');
            // return `<div class="note ${name}">${source}</div>`;
        }
    
        renderer.strong = (text) =>
        {
            const regex = /{{(?<DESCRIPTION>.+?)}}/;
            const match   = text.match(regex);
            const description = match && match.groups ? match.groups["DESCRIPTION"] : "";
    
            if (description.length == 0) return `<b>${text}</b>`
    
            // const text = text.replace(regex, '').replace(/\s{2}/g, '<br>');
            
            return `<div class="tooltip">${text.replace(regex, '')}<div class="description">${description}</div></div>`;
        }

        marked.use({ renderer: renderer, extensions: [ext] });
    }

    parse = (markDownSource : string) : string =>
    {
        const s = marked.parse(markDownSource);        
        if (s == null) return "";
        return s;
    }
}