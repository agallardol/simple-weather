import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class OpenWeatherMapApiInterceptor implements HttpInterceptor {

    private readonly API_KEY = 'fill-me';

    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        const authenticatedRequest = req.clone({
            params: req.params.append('appid', this.API_KEY),
        });
        return next.handle(authenticatedRequest);
    }
}