import { enableProdMode, importProvidersFrom } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { environment } from "./environments/environment";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AppComponent } from "./app/app.component";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      ServiceWorkerModule.register("ngsw-worker.js", {
        enabled: environment.production,
      })
    ),
  ],
}).catch((err) => console.error(err));
