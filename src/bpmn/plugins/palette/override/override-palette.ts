import PaletteProvider from 'bpmn-js/lib/features/palette/PaletteProvider'
import { assign } from 'min-dash'

function OverridePalette(this: any,
  palette: any,
  create: any,
  elementFactory: any,
  spaceTool: any,
  lassoTool: any,
  handTool: any,
  globalConnect: any,
  translate: any
) {
  PaletteProvider.call(
    this,
    palette,
    create,
    elementFactory,
    spaceTool,
    lassoTool,
    handTool,
    globalConnect,
    translate
  )
}

class OverrideEntries {
  prototype: any

  constructor(p: any) {
    this.prototype = p

    this.overridePaletteEntries()
  }

  overridePaletteEntries() {
    this.prototype.getPaletteEntries = function() {
      const actions = {}
      const create = this._create
      const elementFactory = this._elementFactory
      const spaceTool = this._spaceTool
      const lassoTool = this._lassoTool
      const handTool = this._handTool
      const globalConnect = this._globalConnect
      const translate = this._translate

      function createAction(type: string, group: any, className: string, title: string, options?: any) {
        function createListener(event: any) {
          const shape = elementFactory.createShape(assign({ type }, options))

          if (options)
            shape.businessObject.di.isExpanded = options.isExpanded

          create.start(event, shape)
        }

        const shortType = type.replace(/^bpmn:/, '')

        return {
          group,
          className,
          title: title || translate('Create {type}', { type: shortType }),
          action: {
            dragstart: createListener,
            click: createListener
          }
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function createSubprocess(event: any) {
        const subProcess = elementFactory.createShape({
          type: 'bpmn:SubProcess',
          x: 0,
          y: 0,
          isExpanded: true
        })

        const startEvent = elementFactory.createShape({
          type: 'bpmn:StartEvent',
          x: 40,
          y: 82,
          parent: subProcess
        })

        create.start(event, [subProcess, startEvent], {
          hints: {
            autoSelect: [startEvent]
          }
        })
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function createParticipant(event: any) {
        create.start(event, elementFactory.createParticipantShape())
      }

      assign(actions, {
        'hand-tool': {
          group: 'tools',
          className: 'bpmn-icon-hand-tool',
          title: translate('Activate the hand tool'),
          action: {
            click(event: any) {
              handTool.activateHand(event)
            }
          }
        },
        'lasso-tool': {
          group: 'tools',
          className: 'bpmn-icon-lasso-tool',
          title: translate('Activate the lasso tool'),
          action: {
            click(event: any) {
              lassoTool.activateSelection(event)
            }
          }
        },
        'space-tool': {
          group: 'tools',
          className: 'bpmn-icon-space-tool',
          title: translate('Activate the create/remove space tool'),
          action: {
            click(event: any) {
              spaceTool.activateSelection(event)
            }
          }
        },
        'global-connect-tool': {
          group: 'tools',
          className: 'bpmn-icon-connection-multi',
          title: translate('Activate the global connect tool'),
          action: {
            click(event: any) {
              globalConnect.toggle(event)
            }
          }
        },
        'tool-separator': {
          group: 'tools',
          separator: true
        },
        'create.start-event': createAction(
          'bpmn:StartEvent',
          'event',
          'bpmn-icon-start-event-none',
          translate('Create StartEvent')
        ),
        // "create.intermediate-event": createAction(
        //   "bpmn:IntermediateThrowEvent",
        //   "event",
        //   "bpmn-icon-intermediate-event-none",
        //   translate("Create Intermediate/Boundary Event")
        // ),
        'create.end-event': createAction(
          'bpmn:EndEvent',
          'event',
          'bpmn-icon-end-event-none',
          translate('Create EndEvent')
        ),
        'create.exclusive-gateway': createAction(
          'bpmn:ExclusiveGateway',
          'gateway',
          'bpmn-icon-gateway-none',
          translate('Create Gateway')
        ),
        'create.user-task': createAction(
          'bpmn:UserTask',
          'activity',
          'bpmn-icon-user-task',
          translate('Create User Task')
        )
        // "create.data-object": createAction(
        //   "bpmn:DataObjectReference",
        //   "data-object",
        //   "bpmn-icon-data-object",
        //   translate("Create DataObjectReference")
        // ),
        // "create.data-store": createAction(
        //   "bpmn:DataStoreReference",
        //   "data-store",
        //   "bpmn-icon-data-store",
        //   translate("Create DataStoreReference")
        // ),
        // "create.subprocess-expanded": {
        //   group: "activity",
        //   className: "bpmn-icon-subprocess-expanded",
        //   title: translate("Create expanded SubProcess"),
        //   action: {
        //     dragstart: createSubprocess,
        //     click: createSubprocess,
        //   },
        // },
        // "create.participant-expanded": {
        //   group: "collaboration",
        //   className: "bpmn-icon-participant",
        //   title: translate("Create Pool/Participant"),
        //   action: {
        //     dragstart: createParticipant,
        //     click: createParticipant,
        //   },
        // },
        // "create.group": createAction("bpmn:Group", "artifact", "bpmn-icon-group", translate("Create Group"))
      })

      return actions
    }
  }
}

OverridePalette.$inject = [
  'palette',
  'create',
  'elementFactory',
  'spaceTool',
  'lassoTool',
  'handTool',
  'globalConnect',
  'translate'
]

const f = new OverrideEntries(PaletteProvider.prototype)

OverridePalette.prototype.getPaletteEntries = f.prototype.getPaletteEntries
OverridePalette.prototype.constructor = OverridePalette // 修复子类OverridePalette的构造器指向，防止原型链的混乱；

export default OverridePalette
