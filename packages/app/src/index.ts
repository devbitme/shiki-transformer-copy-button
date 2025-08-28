import { h, s } from 'hastscript';
import type { ShikiTransformer } from '@shikijs/types';

export interface Options {
    toggleDelay?: number,
    iconCopy?: ReturnType<typeof s> | null,
    iconSuccess?: ReturnType<typeof s> | null,
    textCopy?: string | null,
    textSuccess?: string | null
}

export function addCopyButton(options: Options = {}): ShikiTransformer {
    const toggleDelay = options.toggleDelay || 3000;
    const iconCopy = options.iconCopy === undefined ? s('svg',
        { viewBox: '0 0 16 16', xmlns: 'http://www.w3.org/2000/svg' },
        [
            s('path', { d: 'M6 6v8h8V6H6zm1 1h6v6H7V7z' }),
            s('path', { d: 'M3 3v8h2v-1H4V4h6v1h1V3H4Z' })
        ]
    ) : options.iconCopy;
    const iconSuccess = options.iconSuccess === undefined ? s('svg',
        { viewBox: '0 0 16 16', xmlns: 'http://www.w3.org/2000/svg' },
        [
            s('path', { d: 'M11 5v1h1V5h-1zm0 1h-1v1h1V6zm-1 1H9v1h1V7zM9 8H8v1h1V8zM8 9H7v1h1V9zm-1 1H6v1h1v-1zm-1 0V9H5v1h1zM5 9V8H4v1h1z' })
        ]
    ) : options.iconSuccess;
    const textCopy = options.textCopy === undefined ? 'copy' : options.textCopy;
    const textSuccess = options.textSuccess === undefined ? 'copied' : options.textSuccess;

    return {
        name: 'shiki-transformer-copy-button',
        pre(node) {

            const readyChildren = [];
            if (iconCopy) readyChildren.push(iconCopy);
            if (textCopy !== null) readyChildren.push(h('span', {}, textCopy));

            const successChildren = [];
            if (iconSuccess) successChildren.push(iconSuccess);
            if (textSuccess !== null) successChildren.push(h('span', {}, textSuccess));

            const button = h(
                'button',
                {
                    class: 'copy',
                    onclick: `
                        const code = this.parentElement.querySelector('code');
                        if (code) navigator.clipboard.writeText(code.innerText);
                        this.classList.add('copied');
                        setTimeout(() => this.classList.remove('copied'), ${toggleDelay})
                    `
                },
                [
                    h('div', { className: ['ready'] }, readyChildren),
                    h('div', { className: ['success'] }, successChildren)
                ]
            );

            node.children.push(button)
        }
    }
}