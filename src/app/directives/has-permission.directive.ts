import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit {

  @Input("appHasPermission") role!: string;

  constructor(
    private authService: AuthService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
    ) { }

  async ngOnInit(): Promise<void> {
    const isAuthorized = await this.authService.isAuthorized(this.role)
    if(isAuthorized)
      this.viewContainer.createEmbeddedView(this.templateRef);
    else
      this.viewContainer.clear();
  }

}
