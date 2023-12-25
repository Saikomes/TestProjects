import { sleep, group, check } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';
import {parseHTML} from "k6/html";
import { Trend } from 'k6/metrics';
import { vu } from 'k6/execution';
import papaparse from './papaparse/papaparse.js';

const data = new SharedArray('users', function () {
  return JSON.parse(open('./data2.json')).root.users;
});

const myTrend = new Trend('response_time');

export const options = {
  scenarios: {
    'ramping': {
      executor: 'ramping-vus',
	  startVUs: 1,
      stages: [
		{duration: '4m', target: 20},
		{duration: '4m', target: 0},
	],
	gracefulRampDown: '0s',
    },
    'use-all-the-data': {
	  startTime: '10m',
      executor: 'shared-iterations',
	  vus: 20,
      iterations: data.length * 2,
      maxDuration: '1h',
    },
  },
};

const requestHeaders = {
	host: 'test-serv7:8080',
	accept: '*/*',
	'accept-language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
	'accept-encoding': 'gzip, deflate',
	origin: 'http://test-serv7:8080',
};


export default function main() {
  let response
  let doc
  let token
  let remember
  let k = 0;
  let xx = Math.floor(scenario.iterationInTest/data.length);
  if (xx > 0) {
    k = scenario.iterationInTest - data.length * xx;
  } else {
    k = scenario.iterationInTest;
  }
  console.log(`user: ${k}`);
  const user = data[k];

  group('page_1 - load login page', function () {
  response = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/Account/LogOn',
    params: {
		headers: requestHeaders,
    },
  };
  const req1 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/combres.axd/mainCss/45588796/',
    params: {
		headers: requestHeaders,
    },
  };
  const req2 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/combres.axd/mainJs/1967048886/',
    params: {
		headers: requestHeaders,
    },
  };
  const req3 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/combres.axd/Account/-1103180961/',
    params: {
		headers: requestHeaders,
    },
  };
  const req4 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/ContentVersioned/811322686/Images/Customer/bg_centered.jpg',
    params: {
		headers: requestHeaders,
    },
  };
  const req5 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/ContentVersioned/811322686/Images/eso-logo.png',
    params: {
		headers: requestHeaders,
    },
  };  
  var start = new Date();
  const responses = http.batch([response, req1, req2, req3, req4, req5]);
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
  console.log(myTrend.name)
  })
  
   group('page_2 - login and load main page', function () {

  response = http.post(
      'http://test-serv7:8080/ES/Account/LogOn',
      {
        __RequestVerificationToken: `${token}`,
        Email: `${user.Email}`,
        Password: '12345678',
        RememberMe: `${remember}`,
      },
      {
        headers: requestHeaders,
      }
    )
  const req1 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/combres.axd/mainCss/45588796/',
	params: {
		headers: requestHeaders,
    },
  };
  const req2 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/combres.axd/mainJs/1967048886/',
	params: {
		headers: requestHeaders,
    },
  };
  const req3 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/combres.axd/PdfDetector/-924522449/',
	params: {
		headers: requestHeaders,
    },
  };
  const req4 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/ContentVersioned/811322686/Images/Customer/bg_centered.jpg',
	params: {
		headers: requestHeaders,
    },
  };
  const req5 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/ContentVersioned/811322686/Images/eso-logo.png',
	params: {
		headers: requestHeaders,
    },
  };
  const req6 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/ContentVersioned/811322686/Images/Customer/es_logo_big.png',
	params: {
		headers: requestHeaders,
    },
  };
  const req7 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/ContentVersioned/811322686/Images/Customer/CustomerOffice/gradient-sprite.png',
	params: {
		headers: requestHeaders,
    },
  };  
  const req8 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/ContentVersioned/811322686/Images/jQuery/ui-icons_525252_0.png',
	params: {
		headers: requestHeaders,
    },
  };    
  const responses = http.batch([req1, req2, req3, req4, req5, req6, req7, req8]);
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
    url: 'http://test-serv7:8080/ES/SimplifiedView',
	params: {
		headers: requestHeaders,
    },
  };
  const req2 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/combres.axd/mainJs/-162145716/',
	params: {
		headers: requestHeaders,
    },
  };
  const req3 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/combres.axd/d3/-755644046/',
	params: {
		headers: requestHeaders,
    },
  };
  const req4 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/combres.axd/Simplified/964175803/',
	params: {
		headers: requestHeaders,
    },
  };
  const req5 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/ContentVersioned/811322686/Images/Customer/bg_left_side.png',
	params: {
		headers: requestHeaders,
    },
  };
  const req6 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/ContentVersioned/811322686/Images/Customer/bg_left_side_header.png',
	params: {
		headers: requestHeaders,
    },
  };  
  const req7 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/ContentVersioned/811322686/Images/jQuery/ui-icons_ffffff_0.png',
	params: {
		headers: requestHeaders,
    },
  }; 
  const req8 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/ContentVersioned/811322686/Images/Customer/mainpageback.png',
	params: {
		headers: requestHeaders,
    },
  }; 
  const req9 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/ContentVersioned/811322686/Images/Customer/bg_left_side_right.jpg',
	params: {
		headers: requestHeaders,
    },
  };
    const req10 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/Content/Images/favicon.png',
	params: {
		headers: requestHeaders,
    },
  };
  const responses = http.batch([req1, req2, req3, req4, req5, req6, req7, req8, req9, req10]);
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
    url: 'http://test-serv7:8080/ES/Report?id=1010&c=953876&StartDT=2022-07-01T00%3A00%3A00&EndDT=2022-08-01T00%3A00%3A00&Precision=2&RootPointIDs=null&RateCount=1&FixedNIs=0&ShowMeterMountHist=0&ParamTypes=5&format=html',
	params: {
	headers: requestHeaders,
    },
  };
    const req2 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/combres.axd/htmlReportCss/1532385688/',
	params: {
		headers: requestHeaders,
    },
  };
    const req3 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/Content/Styles/Requirements.css',
	params: {
		headers: requestHeaders,
    },
  };
    const req4 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/combres.axd/jsForReports/1209654116/',
	params: {
		headers: requestHeaders,
    },
  };
    const req5 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/StiView/ViewerEvent?stiweb_component=Viewer&stiweb_action=Resource&stiweb_data=scripts&stiweb_theme=Office2013WhiteBlue&stiweb_loc=fi9WaWV3cy9TaGFyZWQvUmVwb3J0aW5nL0xvY2FsaXphdGlvbi9ydS54bWw%3d&stiweb_cachemode=cache&stiweb_version=2019.1.1',
	params: {
		headers: requestHeaders,
    },
  };
    const req6 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/StiView/ViewerEvent?stiweb_component=Viewer&stiweb_action=Resource&stiweb_data=styles&stiweb_theme=Office2013WhiteBlue&stiweb_cachemode=cache&stiweb_version=2019.1.1',
	params: {
		headers: requestHeaders,
    },
  };
    const req7 = {
    method: 'GET',
    url: 'http://test-serv7:8080/ES/Content/Images/favicon.png',
	params: {
		headers: requestHeaders,
    },
  };
    const req8 = {
    method: 'POST',
    url: 'http://test-serv7:8080/ES/StiView/GetReportSnapshot?id=1010&c=953876&StartDT=2022-07-01T00%3a00%3a00&EndDT=2022-08-01T00%3a00%3a00&Precision=2&RootPointIDs=null&RateCount=1&FixedNIs=0&ShowMeterMountHist=0&ParamTypes=5&format=html',
    body : {
          stiweb_component: 'Viewer',
          stiweb_action: 'GetReport',
          stiweb_parameters:
            'eyJ2aWV3ZXJJZCI6Ik12Y1ZpZXdlciIsInJvdXRlcyI6eyJhY3Rpb24iOiJJbmRleCIsImNvbnRyb2xsZXIiOiJSZXBvcnQifSwiZm9ybVZhbHVlcyI6e30sImNsaWVudEd1aWQiOiJiZDhkYjZjOWFjNTc0NjljOWVmYWM0YjZlYzQwYTQxMCIsImRyaWxsRG93bkd1aWQiOm51bGwsImNhY2hlTW9kZSI6Ik9iamVjdENhY2hlIiwiY2FjaGVUaW1lb3V0IjoxMCwiY2FjaGVJdGVtUHJpb3JpdHkiOiJEZWZhdWx0IiwicGFnZU51bWJlciI6MCwicmVwb3J0VHlwZSI6IkF1dG8iLCJ6b29tIjoxMDAsInZpZXdNb2RlIjoiU2luZ2xlUGFnZSIsInNob3dCb29rbWFya3MiOnRydWUsIm9wZW5MaW5rc1dpbmRvdyI6Il9ibGFuayIsImNoYXJ0UmVuZGVyVHlwZSI6IkFuaW1hdGVkVmVjdG9yIiwicmVwb3J0RGlzcGxheU1vZGUiOiJUYWJsZSIsImRyaWxsRG93blBhcmFtZXRlcnMiOltdLCJlZGl0YWJsZVBhcmFtZXRlcnMiOm51bGwsInVzZVJlbGF0aXZlVXJscyI6dHJ1ZSwicGFzc1F1ZXJ5UGFyYW1ldGVyc0ZvclJlc291cmNlcyI6ZmFsc2UsInBhc3NRdWVyeVBhcmFtZXRlcnNUb1JlcG9ydCI6ZmFsc2UsInZlcnNpb24iOiIyMDE5LjEuMSIsInJlcG9ydERlc2lnbmVyTW9kZSI6ZmFsc2V9',
        },
	params: {
     headers: requestHeaders,
    },
  };
	  const responses = http.batch([req1, req2, req3, req4, req5, req6, req7, req8]);
      console.log(JSON.stringify(responses[7].json().previewSettings.reportBookmarks))
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

  // Automatically added sleep
  sleep(1)
}
