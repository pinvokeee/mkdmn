import MarkdownIt from "markdown-it"
import MarkdownItContainer from "markdown-it-container";
import utils from "markdown-it/lib/common/utils";
import Token from "markdown-it/lib/token";

export class CustomMarkedownParser
{
    private markedown : MarkdownIt;

    invalidate = () =>
    {

    }

    constructor()
    {
        this.markedown = new MarkdownIt(
            {
                html : true,
                xhtmlOut: true,
                linkify: true,
            }
        );

        this.markedown.use(MarkdownItContainer, 'note', 
        {
            validate: (params : string) => params.trimEnd().match(/^note\s+(.*)$/),
          
            render: function (tokens: Token[], index: number) 
            {
                var m = tokens[index].info.match(/^note\s+(.*)$/);          
                // return `<div class="note warn">dwadaw</div>`;

                if (tokens[index].nesting === 1) return `<div class="note warn">`
                else return '</div>';
            }
          });


        // this.markedown.use(MarkdownItContainer, 'spoiler', 
        // {
        //     validate: (params : string) =>
        //     {
        //         return params.trim().match(/^spoiler\s+(.*)$/);
        //     },
          
        //     render: function (tokens: Token[], index: number) {
        //       var m = tokens[index].info.trim().match(/^spoiler\s+(.*)$/);
          
        //       if (tokens[index].nesting === 1) {
        //         // opening tag
        //         return '<details><summary>' + utils.escapeHtml(m[1]) + '</summary>\n';
          
        //       } else {
        //         // closing tag
        //         return '</details>\n';
        //       }
        //     }
        //   });

          console.log(this.markedown.render('::: spoiler click me\n*content*\n:::\n'));

        this.invalidate();
        
        // const d = MarkdownItContainer(this.markedown, "test", {});

   
          
        //   console.log(render('::: spoiler click me\n*content*\n:::\n'));
          

        // this.markedown.use(MarkdownItContainer, 'spoiler', {

        //     validate: function(params : any) {
        //       return params.trim().match(/^spoiler\s+(.*)$/);
        //     },
          
        //     render: function (tokens : any, idx : any) {
        //       var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
          
        //       if (tokens[idx].nesting === 1) {
        //         // opening tag
        //         return '<details><summary>' + m[1] + '</summary>\n';
          
        //       } else {
        //         // closing tag
        //         return '</details>\n';
        //       }
        //     }
        //   });

        // MarkdownItContainer(this.markedown, "mdc", { });
     
        // MarkdownItContainer(this.markedown, "test", {});

        // this.markedown.use(MarkdownItContainer, "test", );


        // this.markedown.use(MarkdownItContainer, 'spoiler', {
        //     validate: (params: any) => params.trim().match(/^spoiler\s+(.*)$/),
        //     render: (tokens: MarkdownIt.Token[], index: number) => {
        //         const match = tokens[index].info.trim().match(/^spoiler\s+(.*)$/);
        //         const onClick =
        //             "this.parentNode.classList.toggle('_expanded');" +
        //             "event.preventDefault();";
        
        //         if (tokens[index].nesting === 1) {
        //             return (
        //                 '<div class="markdown__spoiler">\n' +
        //                 '<div class="markdown__spoiler-title" onclick="' + onClick + '">\n' +
        //                 md.utils.escapeHtml(match && match[1] || '') + '\n' +
        //                 '</div>\n' +
        //                 '<div class="markdown__spoiler-content">\n'
        //             );
        //         } else {
        //             return '</div></div>\n';
        //         }
        //     }
        // });
        
        //         this.markedown.use( use: [
//     // ### markdown-it-containerの設定 ###
//     ['markdown-it-container', 'warning', {

//       validate: function(params) {
//         return params.trim().match(/^message\s+(.*)$/);
//       },
    
//       render: function (tokens, idx) {
//         var m = tokens[idx].info.trim().match(/^message\s+(.*)$/);
    
//         if (tokens[idx].nesting === 1) {
//           return '<div class="message ' + md.utils.escapeHtml(m[1]) + '"><div class="message-body">';
    
//         } else {
//           return '</div></div>\n';
//         }
//       }
//     }],
//     // ### ここまで ###
//     'markdown-it-toc'
//   ])
    }

    parse = (markDownSource : string) : string =>
    {
        return this.markedown.render(markDownSource);
    }
}