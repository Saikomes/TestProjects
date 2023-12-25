import http from 'k6/http'
import { sleep, group, check, Selector } from 'k6'

class ValidateReport {
    constructor(format, reportName) {
        this.format = format;
        this.reportName = reportName;
    }

    validate(response) {
        let rsp;
        if (this.format === 'html') {
            rsp = response.body;
        } else if (this.format === 'Pdf') {
            let enc = new TextDecoder();
            if (this.reportName === 'Максимумы по суткам за месяц') {
                this.reportName = 'Максимум';
                enc = new TextDecoder('utf-16');
            }
            rsp = enc.decode(response.body.slice(0, 1024));
        } else if (this.format === 'Excel' || this.format === 'EXCELOPENXML') {
            rsp = decodeURIComponent(response.headers['Content-Disposition']);
        } else {
            throw new Error(`NotImplementedException: ${this.format}`);
        }
        check(rsp, {
            [`Report includes valid title ${this.reportName}`]: (rsp) => {
                return rsp.includes(this.reportName);
            }
        })
    }
}

export default ValidateReport