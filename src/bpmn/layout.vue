<template>
  <div class="bpmn-layout">
    <div ref="bpmnContainer" class="bpmn-container">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onDeactivated, onMounted, ref } from 'vue'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import CustomContentPadProvider from './plugins/content-pad'
import defaultXml from './utils/default-xml'
import OverridePalette from './plugins/palette/override/index'
import translationsCN from './plugins/translate/zh'
import customTranslate from './plugins/translate/custom-translate'

export default defineComponent({
  name: 'BpmnLayout',
  setup() {
    const bpmnContainer = ref()
    let bpmnModeler: any = null

    const createNewDiagram = async (xml?: string) => {
      if (!bpmnModeler)
        return

      const xmlString = xml || defaultXml(`Process-${Date.now()}`, `流程图-${Date.now()}`)
      try {
        const { warnings } = await bpmnModeler.importXML(xmlString)
        if (warnings && warnings.length)
          warnings.forEach((warn: any) => console.warn(warn))
      } catch (ignoreError) {
        console.error(`[Process Designer Warn]: ${ignoreError}`)
      }
    }

    const initBpmn = () => {
      nextTick(() => {
        if (bpmnContainer.value && !bpmnModeler) {
          bpmnModeler = new BpmnModeler({
            container: bpmnContainer.value,
            additionalModules: [
              OverridePalette,
              CustomContentPadProvider,
              {
                translate: ['value', customTranslate(translationsCN)]
              }
            ]
          })
          createNewDiagram()
        }
      })
    }

    onMounted(() => {
      initBpmn()
    })

    onDeactivated(() => {
      if (bpmnModeler) {
        bpmnModeler.destroy()
        bpmnModeler = null
      }
    })

    return {
      bpmnContainer
    }
  }
})
</script>

<style lang="scss" scoped>
@import "bpmn-js/dist/assets/diagram-js.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
.bpmn-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .bpmn-container {
    flex: 1;
    width: 100%;
    background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+")
      repeat !important;
  }
  &::v-deep(.djs-palette.open) {
     .djs-palette-entries {
        div[class^="bpmn-icon-"]:before,
        div[class*="bpmn-icon-"]:before {
          line-height: unset;
        }
        div.entry {
          position: relative;
        }
        div.entry:hover {
          &::after {
            width: max-content;
            content: attr(title);
            vertical-align: text-bottom;
            position: absolute;
            right: -10px;
            top: 0;
            bottom: 0;
            overflow: hidden;
            transform: translateX(100%);
            font-size: 0.5em;
            display: inline-block;
            text-decoration: inherit;
            font-variant: normal;
            text-transform: none;
            background: #fafafa;
            box-shadow: 0 0 6px #eeeeee;
            border: 1px solid #cccccc;
            box-sizing: border-box;
            padding: 0 16px;
            border-radius: 4px;
            z-index: 100;
          }
        }
      }
  }
}
</style>
