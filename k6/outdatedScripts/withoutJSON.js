import { sleep, group } from 'k6'
import http from 'k6/http'
import { Trend } from 'k6/metrics';
import {parseHTML} from "k6/html";
import { check } from 'k6';

const myTrend = new Trend('response_time');

export const options = {
  ext: {
    loadimpact: {
      distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
      apm: [],
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response
  let doc
  let token
  let remember

  constvars = {}
  var group_duration;

  group('page_1 - http://172.23.11.93:8080/ES/Account/LogOn', function () {
  response = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/Account/LogOn',
    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req1 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/combres.axd/mainCss/45588796/',
    params: {
      headers: {
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req2 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/combres.axd/mainJs/1967048886/',
    params: {
      headers: {
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req3 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/combres.axd/Account/-1103180961/',
    params: {
      headers: {
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req4 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/Customer/bg_centered.jpg',
    params: {
      headers: {
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req5 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/eso-logo.png',
    params: {
      headers: {
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };  
  var start = new Date();
  const responses = http.batch([response, req1, req2, req3, req4, req5]);
  doc = parseHTML(responses[0].body);
  token = doc
      .find('input[name=__RequestVerificationToken]')
      .first()
      .attr('value');
  remember = doc
	.find('input[name=RememberMe]')
	.first()
	.attr('value');
  console.log("======= START console.log(resp.body.replace(...) - works ==========")
  console.log(token); // works
  console.log("======= END ==========\n")
  console.log("======= START console.log(resp.body.replace(...) - works ==========")
  console.log(remember); // works
  console.log("======= END ==========\n")
  myTrend.add(new Date() - start);
  console.log(myTrend.name)
  })
  
 group('page_2 - http://172.23.11.93:8080/ES/Account/LogOn', function () {

  response = http.post(
      'http://172.23.11.93:8080/ES/Account/LogOn',
      {
        __RequestVerificationToken: `${token}`,
        Email: 'es_demo@test-serv2.prosoft.ural.ru',
        Password: '12345678',
        RememberMe: `${remember}`,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://172.23.11.93:8080',
          'upgrade-insecure-requests': '1',
        },
      }
    )
  sleep(5.3)
  const req1 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/combres.axd/mainCss/45588796/',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req2 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/combres.axd/mainJs/1967048886/',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req3 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/combres.axd/PdfDetector/-924522449/',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req4 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/Customer/bg_centered.jpg',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req5 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/eso-logo.png',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req6 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/Customer/es_logo_big.png',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req7 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/Customer/CustomerOffice/gradient-sprite.png',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };  
  const req8 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/jQuery/ui-icons_525252_0.png',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };    
  const responses = http.batch([req1, req2, req3, req4, req5, req6, req7, req8]);
  })
  
   group('page_3 - http://172.23.11.93:8080/ES/SimplifiedView', function () {

  const req1 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/SimplifiedView',
	params: {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    },
  };
  const req2 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/combres.axd/mainCss/45588796/',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req3 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/combres.axd/mainJs/1967048886/',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req4 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/combres.axd/d3/-755644046/',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req5 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/combres.axd/Simplified/964175803/',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req6 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/Customer/bg_left_side.png',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req7 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/Customer/bg_left_side_header.png',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };  
  const req8 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/eso-logo.png',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const req9 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/jQuery/ui-icons_ffffff_0.png',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  }; 
  const req10 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/Customer/mainpageback.png',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  }; 
  const req11 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/Customer/bg_left_side_right.jpg',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
    const req12 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/jQuery/ui-icons_525252_0.png',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
    const req13 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/ContentVersioned/811322686/Images/spinner.gif',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
  const responses = http.batch([req1, req2, req3, req4, req5, req6, req7, req8, req9, req10, req11, req12, req13]);
  const req14 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/Content/Images/jQuery/ajax-loader-small.gif',
	    params: {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Opera GX";v="89", "Chromium";v="103", "_Not:A-Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    },
  };
    const req15 = {
    method: 'GET',
    url: 'http://172.23.11.93:8080/ES/SimplifiedView/GetDataForYear?year=2022&pointId=32960&_=1659952650162',
	    params: {
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'x-requested-with': 'XMLHttpRequest',
        },
    },
  };
    const responses2 = http.batch([req14, req15]);
  })
  


  // Automatically added sleep
  sleep(1)
}
