import { sleep, group, check } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';
import {parseHTML} from "k6/html";
import { Trend } from 'k6/metrics';
import { vu } from 'k6/execution';
const myTrend = new Trend('response_time');

export const options = {
  scenarios: {
    'ramping': {
      executor: 'ramping-vus',
	  startVUs: 1,
      stages: [
		{duration: '1m', target: 3},
		{duration: '1m', target: 0},
	],
	gracefulRampDown: '0s',
    },
  },
};

const requestHeaders = {
	host: '172.19.22.210:8090',
	accept: '*/*',
	'accept-language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
	'accept-encoding': 'gzip, deflate',
	origin: 'http://172.19.22.210:8090',
};


export default function main() {
  let response
  let doc
  let token
  let remember
  let k = 0;
  group('page_1 - load login page', function () {
  response = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Account/LogOn',
    params: {
		headers: requestHeaders,
    },
  };
  const req1 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/mainCss.css.v1',
    params: {
		headers: requestHeaders,
    },
  };
  const req2 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/mainJs.js.v1',
    params: {
		headers: requestHeaders,
    },
  };
  const req3 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/Account.js.v1',
    params: {
		headers: requestHeaders,
    },
  };
  const req4 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/es_logo_software.svg',
    params: {
		headers: requestHeaders,
    },
  };
  const req5 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/eso-logo-small.svg',
    params: {
		headers: requestHeaders,
    },
  };
  const req6 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/planet.png',
    params: {
		headers: requestHeaders,
    },
  };  
  const req7 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/favicon.png',
    params: {
		headers: requestHeaders,
    },
  }; 
  var start = new Date();
  const responses = http.batch([response, req1, req2, req3, req4, req5, req6, req7]);
for (let i = 0; i < responses.length; i++) {
  check(responses[i], {
    'group 1 responses status is 200': (res) => res.status === 200,
  });
}
  check(responses[0], {
    'logon page body size check': (res) => res.body.length > 10000,
  });
  doc = parseHTML(responses[0].body);
  token = doc
      .find('input[name=__RequestVerificationToken]')
      .first()
      .attr('value');
  remember = doc
	.find('input[name=RememberMe]')
	.first()
	.attr('value');
  myTrend.add(new Date() - start);
  })
  
   group('page_2 - login and load main page', function () {

  response = http.post(
      'http://172.19.22.210:8090/Account/LogOn',
      {
        __RequestVerificationToken: `${token}`,
        Email: `es_demo@test-serv2.prosoft.ural.ru`,
        Password: '12345678',
        RememberMe: `${remember}`,
      },
      {
        headers: requestHeaders,
      }
    )
  const req1 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/mainCss.css.v1',
	params: {
		headers: requestHeaders,
    },
  };
  const req2 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/mainJs.js.v1',
	params: {
		headers: requestHeaders,
    },
  };
  const req3 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/PdfDetector.js.v1',
	params: {
		headers: requestHeaders,
    },
  };
  const req4 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/bell.svg',
	params: {
		headers: requestHeaders,
    },
  };
  const req5 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/demo-avatar.svg',
	params: {
		headers: requestHeaders,
    },
  };
  const req6 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/down-caret.svg',
	params: {
		headers: requestHeaders,
    },
  };
  const req7 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/eso-logo-small.svg',
	params: {
		headers: requestHeaders,
    },
  };  
  const req8 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/CustomerOffice/arrow_underline.svg',
	params: {
		headers: requestHeaders,
    },
  };
  const req9 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/CustomerOffice/icon_accounting_data.svg',
	params: {
		headers: requestHeaders,
    },
  };
  const req10 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/CustomerOffice/icon-show-events.svg',
	params: {
		headers: requestHeaders,
    },
  };
  const req11 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/CustomerOffice/icon-report-list-index.svg',
	params: {
		headers: requestHeaders,
    },
  };
  const req12 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/CustomerOffice/icon-simplified-view-index.svg',
	params: {
		headers: requestHeaders,
    },
  };  
  const req13 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/CustomerOffice/icon-meter-data-entry-index.svg',
	params: {
		headers: requestHeaders,
    },
  };  
  const req14 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/CustomerOffice/icon-account-membership-details.svg',
	params: {
		headers: requestHeaders,
    },
  };
  const req15 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/CustomerOffice/icon_show_deviation.svg',
	params: {
		headers: requestHeaders,
    },
  };
  const req16 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/CustomerOffice/icon-show-power-grid-metrics.svg',
	params: {
		headers: requestHeaders,
    },
  };  
  const req17 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/CustomerOffice/icon-%D1%81onsumption-summary-index.svg',
	params: {
		headers: requestHeaders,
    },
  }; 
  const req18 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/CustomerOffice/icon-device-registry-show-device-registry.svg',
	params: {
		headers: requestHeaders,
    },
  };
  const req19 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/CustomerOffice/icon-%D1%81ustomer-plans-index.svg',
	params: {
		headers: requestHeaders,
    },
  };  
  const req20 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/planet.png',
	params: {
		headers: requestHeaders,
    },
  }; 
  const responses = http.batch([req1, req2, req3, req4, req5, req6, req7, req8, req9, req10, req11, req12, req13, req14, req15, req16, req17, req18, req19, req20]);
      check(response, {
	    'group 2 responses status is 200': (res) => res.status === 200,
		'main page body size check': (res) => res.body.length > 40000,
      });
	  for (let i = 0; i < responses.length; i++) {
	      check(responses[i], {
		    'group 2 responses status is 200': (res) => res.status === 200,
	      });
	  }
  })
  
     group('page_3 - load simplified view', function () {

  const req1 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/SimplifiedView',
	params: {
		headers: requestHeaders,
    },
  };
  const req2 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/mainCss.css.v1',
	params: {
		headers: requestHeaders,
    },
  };
  const req3 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/mainJs.js.v1',
	params: {
		headers: requestHeaders,
    },
  };
  const req4 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/d3.js.v1',
	params: {
		headers: requestHeaders,
    },
  };
  const req5 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/Simplified.js.v1',
	params: {
		headers: requestHeaders,
    },
  };
  const req6 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/bell.svg',
	params: {
		headers: requestHeaders,
    },
  };  
  const req7 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/demo-avatar.svg',
	params: {
		headers: requestHeaders,
    },
  }; 
  const req8 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/down-caret.svg',
	params: {
		headers: requestHeaders,
    },
  }; 
  const req9 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/eso-logo-small.svg',
	params: {
		headers: requestHeaders,
    },
  };
    const req10 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/warning-icon.svg',
	params: {
		headers: requestHeaders,
    },
  };
  const req11 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/jQuery/ui-icons_525252_0.png',
	params: {
		headers: requestHeaders,
    },
  };  
  const req12 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/seek-prev.svg',
	params: {
		headers: requestHeaders,
    },
  }; 
  const req13 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/seek-next.svg',
	params: {
		headers: requestHeaders,
    },
  }; 
  const req14 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/favicon.png',
	params: {
		headers: requestHeaders,
    },
  };
    const req15 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/spinner.gif',
	params: {
		headers: requestHeaders,
    },
  };
  const responses = http.batch([req1, req2, req3, req4, req5, req6, req7, req8, req9, req10, req11, req12, req13, req14, req15]);
  for (let i = 0; i < responses.length; i++) {
     check(responses[i], {
        'group 3 responses status is 200': (res) => res.status === 200,
     });
  }
  check(responses[0], {
    'simplified view body size check': (res) => res.body.length > 50000,
  });
  })

  group(
    'page_4 - getReport',
    function () {
    const req1 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Report?id=1037&c=749082&StartDT=2023-02-01T00%3A00%3A00&EndDT=2023-03-01T00%3A00%3A00&Precision=2&ID_TimeSchema=null&Agreement=null&RootPointIDs=3%3B21976%3B1&ReportType=0&format=html',
	params: {
	headers: requestHeaders,
    },
  };
    const req2 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/htmlReportCss.css.v1',
	params: {
		headers: requestHeaders,
    },
  };
    const req3 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Styles/Requirements.css',
	params: {
		headers: requestHeaders,
    },
  };
    const req4 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/jsForReports.js.v1',
	params: {
		headers: requestHeaders,
    },
  };
    const req5 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/StiView/ViewerEvent?stiweb_component=Viewer&stiweb_action=Resource&stiweb_data=scripts&stiweb_theme=Office2022WhiteBlue&stiweb_loc=emtMZGIwaFdlL1J2QiszY1JFUnlEOXhZMmMvb1Y2dUJhMFhOM09WTTR6dWZLdWNyU0U5TDZXSmFJWWc9&stiweb_cachemode=cache&stiweb_version=2023.1.6',
	params: {
		headers: requestHeaders,
    },
  };
    const req6 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/StiView/ViewerEvent?stiweb_component=Viewer&stiweb_action=Resource&stiweb_data=styles&stiweb_theme=Office2022WhiteBlue&stiweb_cachemode=cache&stiweb_version=2023.1.6',
	params: {
		headers: requestHeaders,
    },
  };
    const req7 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/StiView/ViewerEvent?stiweb_component=Viewer&stiweb_action=Resource&stiweb_data=images&stiweb_theme=Office2022WhiteBlue&stiweb_cachemode=cache&stiweb_version=2023.1.6&stiweb_imagesscalingfactor=1&stiweb_usecompression=false',
	params: {
		headers: requestHeaders,
    },
  };
    const req8 = {
    method: 'POST',
    url: 'http://172.19.22.210:8090/StiView/GetReportSnapshot?id=1037&c=749082&StartDT=2023-02-01T00%3A00%3A00&EndDT=2023-03-01T00%3A00%3A00&Precision=2&ID_TimeSchema=null&Agreement=null&RootPointIDs=3%3B21976%3B1&ReportType=0&format=html',
    body : {
          stiweb_component: 'Viewer',
          stiweb_action: 'GetReport',
          stiweb_parameters:
            'eyJ2aWV3ZXJJZCI6Ik12Y1ZpZXdlciIsInJvdXRlcyI6eyJhY3Rpb24iOiJJbmRleCIsImNvbnRyb2xsZXIiOiJSZXBvcnQifSwiZm9ybVZhbHVlcyI6e30sImNsaWVudEd1aWQiOiI2MzBhNDA5YmIxNWQ0NjhkOTVkODViNDdlYWZiMjc3NCIsImRyaWxsRG93bkd1aWQiOm51bGwsImRhc2hib2FyZERyaWxsRG93bkd1aWQiOm51bGwsImNhY2hlTW9kZSI6Ik9iamVjdENhY2hlIiwiY2FjaGVUaW1lb3V0IjoxMCwiY2FjaGVJdGVtUHJpb3JpdHkiOiJOb3JtYWwiLCJwYWdlTnVtYmVyIjowLCJvcmlnaW5hbFBhZ2VOdW1iZXIiOjAsInJlcG9ydFR5cGUiOiJBdXRvIiwiem9vbSI6MTAwLCJ2aWV3TW9kZSI6IlNpbmdsZVBhZ2UiLCJzaG93Qm9va21hcmtzIjp0cnVlLCJvcGVuTGlua3NXaW5kb3ciOiJfYmxhbmsiLCJjaGFydFJlbmRlclR5cGUiOiJBbmltYXRlZFZlY3RvciIsInJlcG9ydERpc3BsYXlNb2RlIjoiRnJvbVJlcG9ydCIsImRyaWxsRG93blBhcmFtZXRlcnMiOltdLCJlZGl0YWJsZVBhcmFtZXRlcnMiOm51bGwsInVzZVJlbGF0aXZlVXJscyI6dHJ1ZSwicGFzc1F1ZXJ5UGFyYW1ldGVyc0ZvclJlc291cmNlcyI6ZmFsc2UsInBhc3NRdWVyeVBhcmFtZXRlcnNUb1JlcG9ydCI6ZmFsc2UsInZlcnNpb24iOiIyMDIzLjEuNiIsInJlcG9ydERlc2lnbmVyTW9kZSI6ZmFsc2UsImltYWdlc1F1YWxpdHkiOiJOb3JtYWwiLCJwYXJhbWV0ZXJzUGFuZWxTb3J0RGF0YUl0ZW1zIjp0cnVlLCJjb21iaW5lUmVwb3J0UGFnZXMiOmZhbHNlLCJhbGxvd0F1dG9VcGRhdGVDb29raWVzIjpmYWxzZX0=',
        },
	params: {
     headers: requestHeaders,
    },
  };
	  const responses = http.batch([req1, req2, req3, req4, req5, req6, req7, req8]);
	  for (let i = 0; i < responses.length; i++) {
	      check(responses[i], {
		    'group 4 responses status is 200': (res) => res.status === 200,
	      });
	  }
      check(responses[7], {
	'reportBookmarks check': (res) => res.json().previewSettings.reportBookmarks === true,
	'report body size check': (res) => res.body.length > 10000,
  });
    }
  )
  group('page_4 - ShowData', function () {
    const req1 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/AccountingData/ShowData',
	params: {
		headers: requestHeaders,
    },
  };
    const req2 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Angular/styles/primeng.css?645c005e330ae19f4229',
	params: {
		headers: requestHeaders,
    },
  };
    const req3 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Angular/styles/app.css?de268464938ea21c2a52',
	params: {
		headers: requestHeaders,
    },
  };
    const req4 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/mainCss.css.v1',
	params: {
		headers: requestHeaders,
    },
  };
    const req5 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/mainJs.js.v1',
	params: {
		headers: requestHeaders,
    },
  };
    const req6 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/sb/AccountingData.js.v1',
	params: {
		headers: requestHeaders,
    },
  };
    const req7 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Angular/js/polyfills.js?0d8abf73c1fc637c4acf',
	params: {
		headers: requestHeaders,
    },
  };
    const req8 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Angular/js/vendor.js?8a0ce33849bcce83bedb',
	params: {
		headers: requestHeaders,
    },
  };
    const req9 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Angular/js/app.js?6ff1daf94bb28ceb96bb',
	params: {
		headers: requestHeaders,
    },
  };
    const req10 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/bell.svg',
	params: {
		headers: requestHeaders,
    },
  };
    const req11 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/demo-avatar.svg',
	params: {
		headers: requestHeaders,
    },
  };
    const req12 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/down-caret.svg',
	params: {
		headers: requestHeaders,
    },
  };
    const req13 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/eso-logo-small.svg',
	params: {
		headers: requestHeaders,
    },
  };
    const req14 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Angular/js/0.js?21a7c0a58200ecae114c',
	params: {
		headers: requestHeaders,
    },
  };
    const req15 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Angular/js/1.js?e466201c0c5b04ee6e8d',
	params: {
		headers: requestHeaders,
    },
  };
    const req16 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Angular/js/7.js?028ceaeaff545737face',
	params: {
		headers: requestHeaders,
    },
  };
    const req17 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/icon-double-up.svg',
	params: {
		headers: requestHeaders,
    },
  };
    const req18 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/jQuery/ui-icons_ffffff_0.png',
	params: {
		headers: requestHeaders,
    },
  };
    const req19 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Angular/images/ae8e3674fd32997dc5217d5d6199a5a5.gif',
	params: {
		headers: requestHeaders,
    },
  };
    const req20 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/jQuery/jstree-icons9.png',
	params: {
		headers: requestHeaders,
    },
  };
    const req21 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/calendar-icon.svg',
	params: {
		headers: requestHeaders,
    },
  };
    const req22 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Angular/fonts/primeicons.ttf',
	params: {
		headers: requestHeaders,
    },
  };
    const req23 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/jQuery/ui-icons_525252_0.png',
	params: {
		headers: requestHeaders,
    },
  };
    const req24 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/accounting-tree-icons.png',
	params: {
		headers: requestHeaders,
    },
  };
    const req25 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/Customer/status_alarm9.png',
	params: {
		headers: requestHeaders,
    },
  };
    const req26 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Angular/images/fbd91e98576f66fd2702495251b15240.gif',
	params: {
		headers: requestHeaders,
    },
  };
    const req27 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/AccountingData/GetMainTree?resourceTypeId=1&isDetalized=false&blockElement=%23parentTreePane&_=1675321838378',
	params: {
		headers: requestHeaders,
    },
  };
    const req28 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/jQuery/ajax-loader-small.gif',
	params: {
		headers: requestHeaders,
    },
  };
    const req29 = {
    method: 'GET',
    url: 'http://172.19.22.210:8090/Content/Images/favicon.png',
	params: {
		headers: requestHeaders,
    },
  };

	const responses = http.batch([req1, req2, req3, req4, req5, req6, req7, req8, req9, req10, req11, 
	req12, req13, req14, req15, req16, req17, req18, req19, req20, req21, req22, req23, req24, req25,
	req26, req27, req28, req29]);
  })

  // Automatically added sleep
  sleep(1)
}
