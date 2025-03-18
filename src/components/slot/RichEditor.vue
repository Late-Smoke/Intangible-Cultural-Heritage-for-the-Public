<template>
    <div class="rich-editor" ref="editorRoot" :style="{ '--editor-height': height }">
        <div ref="editorContainer"></div>
    </div>
</template>

<script setup lang="ts">
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import Toolbar from 'quill/modules/toolbar';
import { onUnmounted } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { selectAndUploadFiles } from '@/axios/api/upload'
import { watch } from 'vue';

const text = defineModel<string>('text')
const html = defineModel<string>('html')

const {
    toolbar = true,
    placeholder,
    height = '6em',
} = defineProps<{
    toolbar?: boolean
    placeholder?: string
    height?: string
}>()

const editorRoot = ref<HTMLDivElement>()
const editorContainer = ref<HTMLDivElement>()
let editor: Quill
let editorToolbar: HTMLDivElement
let editorInput: HTMLDivElement

function viewportResizeHandler() {
    if (editorToolbar) {
        editorToolbar.style.bottom = 'initial'
        editorToolbar.style.top = `${visualViewport.height + visualViewport.offsetTop}px`
        editorToolbar.style.transform = 'translateY(-100%)'
    }
}

function insertImage(url: string) {
    editor.insertEmbed(editor.getSelection().index, 'image', url)
}

onMounted(() => {
    // create Quill instance
    editor = new Quill(editorContainer.value, {
        modules: {
            toolbar: toolbar ? [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image'],
            ] : null,
        },
        placeholder,
        theme: 'snow',
    })
    console.log(editor)

    // watch quill change
    editor.on('text-change', () => {
        text.value = editor.getText()
        html.value = editor.getSemanticHTML()
    })

    // watch model change
    watch(html, () => {
        if (html.value) {
            if (html.value != editor.getSemanticHTML()) {
                editor.root.innerHTML = ''
                editor.clipboard.dangerouslyPasteHTML(html.value)
            }
        } else {
            editor.root.innerHTML = ''
        }
    }, { immediate: true })

    watch(text, () => {
        if (text.value) {
            if (text.value != editor.getText()) {
                editor.setText(text.value)
            }
        } else {
            editor.setText('')
        }
    }, { immediate: true })

    // toolbar configuration
    editorToolbar = editorRoot.value.querySelector<HTMLDivElement>('.ql-toolbar')
    editorInput = editorRoot.value.querySelector<HTMLDivElement>('.ql-editor')

    if (editorToolbar) {
        editorToolbar.style.display = 'none'
        editorToolbar.tabIndex = -1

        editorRoot.value.addEventListener('focusin', () => {
            editorToolbar.style.removeProperty('display')
        })
        editorRoot.value.addEventListener('focusout', () => {
            setTimeout(() => {
                if (!editorRoot.value?.contains(document.activeElement)) editorToolbar.style.display = 'none'
            }, 35);
        })

        if (visualViewport) {
            visualViewport.addEventListener('resize', viewportResizeHandler)
            visualViewport.addEventListener('scroll', viewportResizeHandler)
        }

        (editor.getModule('toolbar') as Toolbar).addHandler('image', () => {
            selectAndUploadFiles('image/*', insertImage)
        })
    }
})

onUnmounted(() => {
    if (editorToolbar && visualViewport) {
        visualViewport.removeEventListener('resize', viewportResizeHandler)
        visualViewport.removeEventListener('scroll', viewportResizeHandler)
    }
})
</script>

<style scoped lang="scss">
.rich-editor {
    :deep(.ql-toolbar) {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        border: none;
        border-top: 1px solid #ccc;
        background-color: white;
        z-index: 10;

        .ql-picker.ql-header {
            width: 80px;
        }

        .ql-picker-options {
            top: initial;
            bottom: 100%;
        }

        .ql-picker-label::before,
        .ql-picker-item::before {
            content: '常规';
        }

        .ql-picker-label[data-value="1"]::before,
        .ql-picker-item[data-value="1"]::before {
            content: '大标题';
        }

        .ql-picker-label[data-value="2"]::before,
        .ql-picker-item[data-value="2"]::before {
            content: '小标题';
        }

        .ql-picker-item[data-value="1"]::before {
            font-size: var(--font-size-h1);
        }

        .ql-picker-item[data-value="2"]::before {
            font-size: var(--font-size-h2);
        }
    }

    .ql-container {
        font-size: 1em;
        border: none;

        :deep(.ql-editor) {
            padding: 0;
            min-height: var(--editor-height);
            line-height: 1.5;

            &.ql-blank::before {
                left: 0;
                font-style: normal;
                color: #888;
            }

            h1 {
                font-size: var(--font-size-h1);
            }

            h2 {
                font-size: var(--font-size-h2);
            }

            img {
                max-width: calc(100% - 24px);
                display: block;
                margin: 4px auto;
            }
        }
    }
}
</style>
