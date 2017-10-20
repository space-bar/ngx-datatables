import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild
} from "@angular/core";
import {DatatablesTemplateDirective} from "../datatables-template/datatables-template.directive";
import {DatatablesComponent} from "../datatables/datatables.component";


@Component({
  selector: 'ngx-datatables-portlet',
  template: `
    <div class="portlet portlet-datatable">
      <div class="portlet-title">
        <div class="row">
          <div class="caption col-md-6">
            <ng-container [ngTemplateOutlet]="captionTemplate?.templateRef"></ng-container>
            <ng-container *ngIf="!captionTemplate?.templateRef" #defaultCaptionTemplate>
              <i [ngClass]="iconClass ? iconClass :'glyphicon glyphicon-th-list'"></i>
              <span class="caption-subject">{{caption}}</span>
              <span class="caption-helper">{{description}}</span>
            </ng-container>
          </div>

          <div class="actions col-md-6" #toolsPanel>
            <ng-container [ngTemplateOutlet]="toolsTemplate?.templateRef"></ng-container>
            <ng-container *ngIf="!toolsTemplate?.templateRef" #defaultToolsTemplate>
              <a class="btn filter {{filterClass}}" [attr.title]="filterTitle?filterTitle:'Toggle Filters'"
                 href="javascript:">
                <i [ngClass]="filterIconClass ? filterIconClass :'glyphicon glyphicon-filter'"></i>
              </a>
              <a class="btn fullscreen {{fullscreenClass}}"
                 [attr.title]="fullscreenTitle?fullscreenTitle:'Toggle fullscreen'"
                 href="javascript:">
                <i [ngClass]="fullscreenIconClass ? fullscreenIconClass :'glyphicon glyphicon-resize-full'"></i>
              </a>
            </ng-container>
          </div>
        </div>
      </div>
      <div class="portlet-title datatable-filter" style="display:none" #filterPanel>
        <ng-container [ngTemplateOutlet]="filtersTemplate?.templateRef"></ng-container>
      </div>
      <div class="portlet-body">
        <div>
          <ng-container [ngTemplateOutlet]="actionsTemplate?.templateRef"></ng-container>
        </div>

        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    /***
    Bootstrap Line Tabs by @keenthemes
    A component of Metronic Theme - #1 Selling Bootstrap 3 Admin Theme in Themeforest: http://j.mp/metronictheme
    Licensed under MIT
    ***/

    /* Portlet */
    .portlet {
      background: #fff;
      padding: 20px;
    }

    .portlet.portlet-gray {
      background: #f7f7f7;
    }

    .portlet.portlet-bordered {
      border: 1px solid #eee;
    }

    /* Portlet Title */
    .portlet-title {
      padding: 0;
      min-height: 40px;
      border-bottom: 1px solid #eee;
      margin-bottom: 18px;
    }

    .caption {
      float: left;
      display: inline-block;
      font-size: 18px;
      line-height: 18px;
    }

    .caption.caption-green .caption-subject,
    .caption.caption-green i {
      color: #4db3a2;
      font-weight: 200;
    }

    .caption.caption-red .caption-subject,
    .caption.caption-red i {
      color: #e26a6a;
      font-weight: 200;
    }

    .caption.caption-purple .caption-subject,
    .caption.caption-purple i {
      color: #8775a7;
      font-weight: 400;
    }

    .caption i {
      color: #777;
      font-size: 15px;
      font-weight: 300;
      margin-top: 3px;
    }

    .caption-subject {
      color: #666;
      font-size: 16px;
      font-weight: 600;
    }

    .caption-helper {
      padding: 0;
      margin: 0;
      line-height: 13px;
      color: #9eacb4;
      font-size: 13px;
      font-weight: 400;
    }

    /* Actions */
    .actions {
      float: right;
      display: inline-block;
    }

    .actions a {
      margin-left: 3px;
    }

    .actions .btn {
      color: #666;
      padding: 3px 9px;
      font-size: 13px;
      line-height: 1.5;
      background-color: #fff;
      border-color: #ccc;
      border-radius: 50px;
    }

    .actions .btn i {
      font-size: 12px;
    }

    .actions .btn:hover {
      background: #f2f2f2;
    }

    /* Pagination */
    .pagination {
      margin: -3px 0 0;
      border-radius: 50px;
    }

    .pagination > li > a,
    .pagination > li > span {
      padding: 4px 10px;
      font-size: 12px;
      color: #8775a7;
      background: #f7f7f7;
    }

    .pagination > li:hover > a,
    .pagination > li.active > a,
    .pagination > li.active:hover > a {
      color: #fff;
      background: #8775a7;
      border-color: #8775a7;
    }

    /* Inputs */
    .inputs {
      float: right;
      display: inline-block;
      padding: 4px 0;
      margin-top: -10px;
    }

    .input-inline {
      width: 240px;
      display: inline-block;
      vertical-align: middle;
    }

    /* Tab */
    .portlet-title > .nav-tabs {
      background: none;
      margin: 0;
      float: right;
      display: inline-block;
      border: 0;
    }

    .portlet-title > .nav-tabs > li {
      background: none;
      margin: 0;
      border: 0;
    }

    .portlet-title > .nav-tabs > li > a {
      background: none;
      border: 0;
      padding: 2px 10px 13px;
      color: #444;
    }

    .portlet-title > .nav-tabs > li.active,
    .portlet-title > .nav-tabs > li.active:hover {
      border-bottom: 4px solid #f3565d;
      position: relative;
    }

    .portlet-title > .nav-tabs > li:hover {
      border-bottom: 4px solid #f29b9f;
    }

    .portlet-title > .nav-tabs > li.active > a,
    .portlet-title > .nav-tabs > li:hover > a {
      color: #333;
      background: #fff;
      border: 0;
    }

    /* Btn Circle */
    .actions .btn.btn-circle {
      width: 28px;
      height: 28px;
      padding: 3px 7px;
      text-align: center;
    }

    .actions .btn.btn-circle i {
      font-size: 11px;
    }

    /* Btn Grey Salsa */
    .actions .btn.grey-salsa {
      border: none;
      margin-left: 3px;
      -webkit-box-shadow: none;
              box-shadow: none;
      border-radius: 50px !important;
    }

    .actions .btn.grey-salsa.active {
      color: #fafcfb;
      background: #8e9bae;
    }

    .actions .grey-salsa.btn:hover,
    .actions .grey-salsa.btn:focus,
    .actions .grey-salsa.btn:active,
    .actions .grey-salsa.btn.active {
      color: #fafcfb;
      background: #97a3b4;
    }

    /* Btn Red */
    .actions .btn.btn-red.active,
    .actions .btn.btn-red:hover {
      color: #fff;
      -webkit-box-shadow: none;
              box-shadow: none;
      background: #e26a6a;
      border-color: #e26a6a;
    }

    /* Btn Red */
    .actions .btn.btn-purple.active,
    .actions .btn.btn-purple:hover {
      color: #fff;
      -webkit-box-shadow: none;
              box-shadow: none;
      background: #8775a7;
      border-color: #8775a7;
    }
  `]
})
export class DatatablesPortletComponent implements OnInit, AfterViewInit, AfterContentInit {

  @ViewChild('toolsPanel')
  private toolsPanelElementRef?: ElementRef;

  @ViewChild('actionsPanel')
  private actionsPanelElementRef?: ElementRef;

  @ViewChild('filterPanel')
  private filterPanelElementRef?: ElementRef;

  @ContentChild(DatatablesComponent)
  private datatablesComponent?: DatatablesComponent;

  @ContentChildren(DatatablesTemplateDirective)
  private templates: QueryList<DatatablesTemplateDirective>;

  public actionsTemplate: DatatablesTemplateDirective;

  public filtersTemplate: DatatablesTemplateDirective;

  public toolsTemplate: DatatablesTemplateDirective;

  public captionTemplate: DatatablesTemplateDirective;

  @Input()
  caption ?: string;

  @Input()
  description ?: string;

  @Input()
  iconClass?: string;

  @Input()
  filterClass ?: string;

  @Input()
  filterTitle ?: string;

  @Input()
  filterIconClass ?: string;

  @Input()
  fullscreenClass ?: string;

  @Input()
  fullscreenTitle ?: string;

  @Input()
  fullscreenIconClass ?: string;

  @Input()
  showFullscreenIconClass ?: string;

  @Input()
  hideFullscreenIconClass ?: string;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initTools();
  }

  ngAfterContentInit(): void {
    if (this.templates) {
      this.actionsTemplate = this.findTemplateFor('actions');
      this.filtersTemplate = this.findTemplateFor('filters');
      this.toolsTemplate = this.findTemplateFor('tools');
      this.captionTemplate = this.findTemplateFor('caption');
      if (this.actionsTemplate)
        this.initActions();
    }
  }

  /*public helper functions*/
  get filtersData(): Object {
    if (this.filtersTemplate) {
      let element = this.filtersTemplate.templateRef.elementRef.nativeElement;
      let forms = element.getElementsByTagName("form");
      return forms && forms.length ? this.serializeToJSON(forms[0]) : {};
    }
    return {};
  }

  filters(): Object {
    if (this.filtersTemplate) {
      let element = this.filterPanelElementRef.nativeElement;
      let forms = element.getElementsByTagName("form");
      return forms && forms.length ? this.serializeToJSON(forms[0]) : {};
    }
    return {};
  }

  resetFilters(): void {
    if (this.filtersTemplate) {
      let element = this.filterPanelElementRef.nativeElement;
      let forms = element.getElementsByTagName("form");
      if (forms && forms.length) {
        forms[0].reset();//$('#form_id').trigger("reset");
      }
    }
  }

  filtersPanel(): ElementRef {
    return this.filterPanelElementRef.nativeElement;
  }

  toggleFilter: Function = () => {
  };

  /*init of view panels*/
  private initTools() {
    if (this.toolsPanelElementRef) {
      let $toolsPanel = $(this.toolsPanelElementRef.nativeElement);
      $toolsPanel.children('a.btn-outline').off('mouseleave.tools.dt').on('mouseleave.tools.dt', function (e) {
        $(this).blur();
      });
      this.initFilterTool($toolsPanel);
      this.initFullscreenTool($toolsPanel);
    }
  }

  private initActions() {
    if (this.actionsPanelElementRef) {
      let $actionsPanel = $(this.actionsPanelElementRef.nativeElement);
    }
    this.initActionsToolbar(null);
  }

  /* private initActions() {
   if (this.actionsPanelElementRef) {
   let $actionsPanel = $(this.actionsPanelElementRef.nativeElement);
   let $actionPanelActions = $actionsPanel.children('a.btn-outline');
   $actionPanelActions.off('mouseleave.actions.dt').on('mouseleave.actions.dt', function (e) {
   $(this).blur();
   });
   this.initFilterTool($actionsPanel);
   this.initFullscreenTool($actionsPanel);
   }
   }*/

  /* private initFilterComponent2() {
   let $filterPanel = $(this.filterPanelElementRef.nativeElement);
   let $filterBtn = $(this.actionsPanelElementRef.nativeElement).find('a.filter');
   $filterBtn.off('click.dt').on('click.dt', (e) => {
   e.preventDefault();
   let $filterBtnIcon = $filterBtn.find('i:last');
   if ($filterPanel.is(':visible')) {
   //$filterBtnIcon.removeClass('active');
   $filterPanel.slideUp(200, () => {
   $filterBtn.removeClass('active');
   $filterBtnIcon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
   });
   } else {
   //$filterBtnIcon.removeClass('active');
   $filterPanel.slideDown(200, () => {
   $filterBtn.addClass('active');
   $filterBtnIcon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
   });
   }
   });
   }

   private initFilter() {
   let $filterPanel = $(this.filterPanelElementRef.nativeElement);
   let $filterBtn = $(this.actionsPanelElementRef.nativeElement).find('a.filter');
   let filter_onclick = (e) => {
   if (e)
   e.preventDefault();
   let $filterBtnIcon = $filterBtn.find('i:last');
   if (e ? $filterPanel.is(':visible') : !$filterPanel.is(':visible')) {
   $filterBtn.removeClass('active').addClass('btn-outline');
   $filterPanel.slideUp(200);
   } else {
   $filterBtn.addClass('active').removeClass('btn-outline');
   $filterPanel.slideDown(200);
   }
   };
   $filterBtn.off('click.dt').on('click.dt', filter_onclick);
   filter_onclick(null);
   }*/


  private initFilterTool($toolPanel: JQuery) {
    let $filterBtn = $toolPanel.children('a.filter');
    let $filterPanel = $(this.filterPanelElementRef.nativeElement);
    let $filterBtnIcon = $filterBtn.find('i:last');
    let onclickFilter = (e) => {
      if (e)
        e.preventDefault();
      if (e ? $filterPanel.is(':visible') : !$filterPanel.is(':visible')) {
        $filterBtn.removeClass('active').addClass('btn-outline');
        $filterPanel.slideUp(200);
      } else {
        $filterBtn.addClass('active').removeClass('btn-outline');
        $filterPanel.slideDown(200);
      }
    };
    $filterBtn.off('click.dt').on('click.dt', onclickFilter);
    onclickFilter(null);
    this.toggleFilter = onclickFilter;
  }

  private initFullscreenTool($toolPanel: JQuery) {
    let $fullscreenBtn = $toolPanel.find('a.fullscreen');
    let $fullscreenBtnIcon = $fullscreenBtn.find('i:last');
    let onclickFullscreen = () => {
      setTimeout(() => {
        if ($fullscreenBtn.hasClass('on')) {
          $fullscreenBtnIcon.removeClass('fa-expand').addClass('fa-compress');
          $fullscreenBtn.addClass('active').removeClass('btn-outline');
        } else {
          $fullscreenBtnIcon.removeClass('fa-compress').addClass('fa-expand');
          $fullscreenBtn.removeClass('active').addClass('btn-outline');
        }
      }, 100);
    };
    $fullscreenBtn.off('click.dt').on('click.dt', onclickFullscreen);
    onclickFullscreen();
  }

  private initActionsToolbar($actionsPanel: JQuery) {
    console.log(this.actionsTemplate.templateRef.elementRef.nativeElement);
    if (this.datatablesComponent && this.actionsTemplate) {
      let subscription = this.datatablesComponent.toolbar.subscribe((toolbar: Element) => {
        console.log("=" + toolbar);
        $(toolbar).append($(this.actionsTemplate.templateRef.elementRef.nativeElement));
      });
    }
  }

  /*utility functions*/
  private findTemplateFor(templateName: string): DatatablesTemplateDirective {
    let templates: DatatablesTemplateDirective[] = this.templates != null ? this.templates.filter(template => {
      console.log(template);
      return template.ngxDatatablesTemplate === templateName
    }) : null;
    if (templates != null && templates.length > 1) {
      console.warn(`Multiple '${templateName}' Column template detected [ignored]`);
    }
    return templates == null || templates.length === 0 ? null : templates[0];
  }


  private serializeToJSON(form): {} {
    var json = {};
    $.each($(form).serializeArray(), function (i, n) {
      var _name = undefined;
      var _ = n.name.indexOf('[');
      if (_ > -1) {
        _name = n.name.replace(/\]/gi, '').split('[');
      } else if ((_ = n.name.indexOf('.')) > -1) {
        _name = n.name.split('.');
      }
      if (_ > -1 && _name) {
        var o = json;
        for (var i = 0, len = _name.length; i < len; i++) {
          if (i == len - 1) {
            if (o[_name[i]]) {
              if (typeof o[_name[i]] == 'string' || !o[_name[i]].push) {
                o[_name[i]] = [o[_name[i]]];
              }
              o[_name[i]].push(n.value);
            }
            else o[_name[i]] = n.value || '';
          }
          else o = o[_name[i]] = o[_name[i]] || {};
        }
      }
      else {
        if (json[n.name] !== undefined) {
          if (!json[n.name].push) {
            json[n.name] = [json[n.name]];
          }
          json[n.name].push(n.value || '');
        }
        else json[n.name] = n.value || '';
      }
    });
    return json;
  }
}
