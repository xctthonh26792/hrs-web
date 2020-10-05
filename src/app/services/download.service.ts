import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from './toastr.service'
import { saveAs } from 'file-saver'
import { environment } from '../../environments/environment'

@Injectable()
export class DownloadService {
    constructor(private client: HttpClient, private toastr: ToastrService) { }
    download(url: string, name: string, type?: string) {
        return this.client.get(`${environment.api_url}/${url}`, {
            responseType: 'arraybuffer',
            observe: 'response',
        }).toPromise().then((response: HttpResponse<ArrayBuffer>) => {
            const file = new Blob([response.body], { type: type || 'application/octet-stream' });
            saveAs(file, name);
            this.toastr.success(`Tải tệp tin ${name} thành công`);
        }, (error: HttpErrorResponse) => {
            this.toastr.error(`Tải tệp tin ${name} không thành công.`);
        })
    }
}
