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
} from '@angular/core';
import {DatatablesTemplateDirective} from '../datatables-template/datatables-template.directive';
import {DatatablesComponent} from '../datatables/datatables.component';


@Component({
  selector: 'ngx-datatables-portlet',
  templateUrl: './datatables-portlet.component.html',
  styleUrls: ['./datatables-portlet.component.css']
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
      if (this.actionsTemplate) {
        this.initActions();
      }
    }
  }

  /*public helper functions*/
  filters(): Object {
    if (this.filtersTemplate) {
      const element = this.filterPanelElementRef.nativeElement;
      const forms = element.getElementsByTagName('form');
      return forms && forms.length ? this.serializeToJSON(forms[0]) : {};
    }
    return {};
  }

  resetFilters(): void {
    if (this.filtersTemplate) {
      const element = this.filterPanelElementRef.nativeElement;
      const forms = element.getElementsByTagName('form');
      if (forms && forms.length) {
        $(forms).trigger('reset');
      }
    }
  }

  isFilterOpened(): boolean {
    return this.filtersTemplate && $(this.filterPanelElementRef.nativeElement).is(':visible');
  }

  filterPanel(): ElementRef {
    return this.filterPanelElementRef.nativeElement;
  }

  toggleFilter: Function = () => {
  };

  /*init of view panels*/
  private initTools() {
    if (this.toolsPanelElementRef) {
      const $toolsPanel = $(this.toolsPanelElementRef.nativeElement);
      $toolsPanel.children('a.btn-outline').off('mouseleave.tools.dt').on('mouseleave.tools.dt', function (e) {
        $(this).blur();
      });
      this.initFilterTool($toolsPanel);
      this.initFullscreenTool($toolsPanel);
    }
  }

  private initActions() {
    if (this.actionsPanelElementRef) {
      const $actionsPanel = $(this.actionsPanelElementRef.nativeElement);
    }
    this.initActionsToolbar(null);
  }


  private initFilterTool($toolPanel: JQuery) {
    const $filterBtn = $toolPanel.children('a.filter');
    const $filterPanel = $(this.filterPanelElementRef.nativeElement);
    const $filterBtnIcon = $filterBtn.find('i:last');
    const onclickFilter = (e) => {
      if (e) {
        e.preventDefault();
      }
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
    const $fullscreenBtn = $toolPanel.find('a.fullscreen');
    const $fullscreenBtnIcon = $fullscreenBtn.find('i:last');
    const onclickFullscreen = () => {
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
    if (this.datatablesComponent && this.actionsTemplate) {
      const subscription = this.datatablesComponent.toolbar.subscribe((toolbar: Element) => {
        $(toolbar).append($(this.actionsTemplate.templateRef.elementRef.nativeElement));
      });
    }
  }

  /*utility functions*/
  private findTemplateFor(templateName: string): DatatablesTemplateDirective {
    const templates: DatatablesTemplateDirective[] = this.templates != null ? this.templates.filter(template => {
      return template.ngxDatatablesTemplate === templateName
    }) : null;
    if (templates != null && templates.length > 1) {
      console.warn(`Multiple '${templateName}' Column template detected [ignored]`);
    }
    return templates == null || templates.length === 0 ? null : templates[0];
  }


  private serializeToJSON(form): {} {
    const json = {};
    $.each($(form).serializeArray(), function (index, n) {
      let _name;
      let _ = n.name.indexOf('[');
      if (_ > -1) {
        _name = n.name.replace(/\]/gi, '').split('[');
      } else if ((_ = n.name.indexOf('.')) > -1) {
        _name = n.name.split('.');
      }
      if (_ > -1 && _name) {
        let o = json;
        for (let i = 0, len = _name.length; i < len; i++) {
          if (i === len - 1) {
            if (o[_name[i]]) {
              if (typeof o[_name[i]] === 'string' || !o[_name[i]].push) {
                o[_name[i]] = [o[_name[i]]];
              }
              o[_name[i]].push(n.value);
            } else {
              o[_name[i]] = n.value || '';
            }
          } else {
            o = o[_name[i]] = o[_name[i]] || {};
          }
        }
      } else {
        if (json[n.name] !== undefined) {
          if (!json[n.name].push) {
            json[n.name] = [json[n.name]];
          }
          json[n.name].push(n.value || '');
        } else {
          json[n.name] = n.value || '';
        }
      }
    });
    return json;
  }
}
