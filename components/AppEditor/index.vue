<template>
  <div class="AppEditor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="AppEditor__menubar">
        <button
          class="AppEditor__menubar-button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <icon name="bold" />B
        </button>

        <button
          class="AppEditor__menubar-button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <icon name="italic" />I
        </button>

        <button
          class="AppEditor__menubar-button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <icon name="strike" />S
        </button>

        <button
          class="AppEditor__menubar-button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <icon name="underline" />U
        </button>

        <button
          class="AppEditor__menubar-button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <icon name="paragraph" />P
        </button>

        <button
          class="AppEditor__menubar-button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >H1</button>

        <button
          class="AppEditor__menubar-button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >H2</button>

        <button
          class="AppEditor__menubar-button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >H3</button>

        <button
          class="AppEditor__menubar-button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <icon name="ul" />BL
        </button>

        <button
          class="AppEditor__menubar-button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <icon name="ol" />OL
        </button>

        <button
          class="AppEditor__menubar-button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <icon name="quote" />Q
        </button>

        <button class="AppEditor__menubar-button" @click="commands.horizontal_rule">
          <icon name="hr" />HR
        </button>

        <button class="AppEditor__menubar-button" @click="commands.undo">
          <icon name="undo" />UNDO
        </button>

        <button class="AppEditor__menubar-button" @click="commands.redo">
          <icon name="redo" />REDO
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="AppEditor__content" :editor="editor" />
    <AppButton class="AppEditor__save" theme="green" label="Save" @button-click="doSave" />
    <AppButton class="AppEditor__close" theme="red" label="Close" @button-click="doClose" />
  </div>
</template>

<script>
import AppButton from "~/components/ui/AppButton/";
import Icon from "./Icon";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
export default {
  props: {
    content: String, 
    selection: Object
  },
  components: {
    EditorContent,
    EditorMenuBar,
    AppButton,
    Icon
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.editor = new Editor({
      content: this.content,
      extensions: [
        new Blockquote(),
        new BulletList(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new Link(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ]
    });
  },
  methods: {
    doSave() {
      this.$emit('do-save', this.editor.getHTML())
    },
    doClose() {
       this.$emit('do-close', this.editor.getHTML())
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="scss">
.AppEditor {

  margin-bottom: 30px;
  
  &__menubar {
    background-color: $black;
  }

  &__menubar-button {
    padding: 10px;
    background-color: $black;
    border: 0;
    color: $white;
  }

  &__content {
    margin-top: 1px;
    background-color: $black;
  }

  &__save,
  &__close {
    margin-top: 15px;
  }
  &__save {
    margin-right: 10px;
  }
  .ProseMirror {
    padding: 20px;
  }
}
</style>
