import { h } from 'hastscript';
import type { ShikiTransformer } from '@shikijs/types';

export interface Options {
    toggle?: number
}

export function addCopyButton(options: Options = {}): ShikiTransformer {
    const toggleMs = options.toggle || 3000

    return {
        name: 'shiki-transformer-copy-button',
        pre(node) {
            const button = h(
                'button',
                {
                    class: 'copy',
                    onclick: `
                        const code = this.parentElement.querySelector('code');
                        if (code) navigator.clipboard.writeText(code.innerText);
                        this.classList.add('copied');
                        setTimeout(() => this.classList.remove('copied'), ${toggleMs})
                    `
                },
                [
                    h('span', { className: ['ready'] }, 'copy'),
                    h('span', { className: ['success'] }, 'copied!')
                ]
            )

            node.children.push(button)
        }
    }
}