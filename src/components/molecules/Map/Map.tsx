interface FormValues {
  province: {
    name: string;
  };
  results: {
    min: number;
  };
}

export const Map = (data: any) => {
  const mapData = data?.data?.reduce(
    (accumulator: FormValues, currentValue: FormValues) => ({
      ...accumulator,
      [currentValue.province.name]: currentValue.results.min,
    }),
    ""
  );

  return (
    <>
      {mapData ? (
        <svg
          width="548"
          height="460"
          viewBox="0 0 548 460"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M199.957 105.249L195.004 111.415L205.319 172.428L264.273 193.767L272.521 187.172L291.851 135.769L269.741 107.093L199.957 105.249Z"
            fill={mapData["kujawsko-pomorskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M374.043 114.97L444.342 54.6318L275.73 57.2027L273.749 103.63L295.905 132.378L374.043 114.97Z"
            fill={mapData["warmińsko-mazurskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M245.332 284.169L294.175 302.892L325.683 270.918L329.341 231.285L274.106 192.67L266.756 198.552L215.41 278.565L215.436 278.644L214.822 279.51L245.332 284.169Z"
            fill={mapData["łódzkie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M328.951 350.978L362.043 346.187L394.68 309.495L385.857 292.517L328.984 275.096L297.859 306.679L306.973 334.139L328.951 350.978Z"
            fill={mapData["świętokrzyskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M450.432 56.3701L379.043 117.64L449.824 195.624L481.219 164.206L450.432 56.3701Z"
            fill={mapData["podlaskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M443.681 196.721L374.34 120.316L296.81 137.592L277.605 188.658L334.888 228.714L331.058 270.204L385.435 286.858L393.056 222.806L443.681 196.721Z"
            fill={mapData["mazowieckie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M209.004 262.856L212.966 272.577L260.752 198.116L200.624 176.346L189.8 112.307L171.513 101.065L146.841 140.877L133.462 146.243L128.502 197.085L151.946 228.001L209.004 262.856Z"
            fill={mapData["wielkopolskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M123.04 198.631L127.94 148.457L65.3086 173.577L66.3916 192.399L71.087 197.494L68.7426 247.232L80.4977 261.573L146.108 229.051L123.04 198.631Z"
            fill={mapData["lubuskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M500.001 297.75L449.17 199.841L397.97 226.223L390.408 289.813L400.004 308.285L434.655 341.435L476.391 346.074L479.654 333.392L496.091 329.473V308.714L492.565 304.016L500.001 297.75Z"
            fill={mapData["lubelskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M173.845 96.2938L191.603 107.212L197.48 99.8956L268.539 101.766L270.441 57.2886H270.282L270.447 57.0903L270.48 56.2973L271.088 56.3237L278.108 47.8909L267.541 53.7661L262.456 38.883L274 40.4493L253.066 24L190.097 49.7149L173.845 96.2938Z"
            fill={mapData["pomorskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M263.018 374.141L301.704 335.03L292.729 308L249.249 291.333L218.422 362.635L240.545 376.468V392.137H249.15L260.502 415.632L279.257 399.995L263.018 374.141Z"
            fill={mapData["śląskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M474.238 351.156L432.296 346.49L398.015 313.697L366.204 349.458L377.721 413.279L398.253 412.889L446.779 436L440.129 424.249L474.238 351.156Z"
            fill={mapData["podkarpackie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M361.231 351.645L327.505 356.529L304.966 339.254L269.721 374.882L283.351 396.579L283.979 396.05L298.851 427.382L314.509 429.735L325.465 418.765L345.422 414.852L350.903 420.331L359.508 418.375V410.543L372.207 412.48L361.231 351.645Z"
            fill={mapData["małopolskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M143.262 136.621L168.251 96.2872L183.678 52.0742L58.1767 78.0469L69.1326 86.2682L72.6525 97.6288L58.1767 88.231L48 152.845L62.5022 169.004L143.262 136.621Z"
            fill={mapData["zachodniopomorskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M244.309 289.437L243.972 289.305L211.362 284.328L172.709 338.21L204.144 346.312L201.799 352.584L195.143 358.453L204.144 369.027L212.531 362.953L244.309 289.437Z"
            fill={mapData["opolskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <path
            d="M167.221 336.788L209.446 277.937L204.771 266.464L150.011 233.017L80.062 267.693L72.6523 299.713L80.4846 297.75L82.4394 290.308L116.483 311.457L139.18 317.332L145.051 322.031L133.706 334.958L152.877 360.018L168.535 351.01L166.184 336.524L167.221 336.788Z"
            fill={mapData.dolnośląskie > 10 ? "#28DFAE" : "#ED2369"}
          />
          <rect
            x="116.5"
            y="271.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData.dolnośląskie > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="128" y="291.2">
              {mapData.dolnośląskie} DNI
            </tspan>
          </text>
          <rect
            x="116.5"
            y="271.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="210.5"
            y="126.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["kujawsko-pomorskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="222" y="146.2">
              {mapData["kujawsko-pomorskie"]} DNI
            </tspan>
          </text>
          <rect
            x="210.5"
            y="126.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="315.5"
            y="297.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["świętokrzyskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="327" y="317.2">
              {mapData["świętokrzyskie"]} DNI
            </tspan>
          </text>
          <rect
            x="315.5"
            y="297.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="414.5"
            y="265.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["lubelskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="426" y="285.2">
              {mapData["lubelskie"]} DNI
            </tspan>
          </text>
          <rect
            x="414.5"
            y="265.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="84.5"
            y="91.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["zachodniopomorskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="96" y="111.2">
              {mapData["zachodniopomorskie"]} DNI
            </tspan>
          </text>
          <rect
            x="84.5"
            y="91.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="232.5"
            y="323.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["śląskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="244" y="343.2">
              {mapData["śląskie"]} DNI
            </tspan>
          </text>
          <rect
            x="232.5"
            y="323.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="292.5"
            y="369.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["małopolskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="304" y="389.2">
              {mapData["małopolskie"]} DNI
            </tspan>
          </text>
          <rect
            x="292.5"
            y="369.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="402.5"
            y="107.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["podlaskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="414" y="127.2">
              {mapData["podlaskie"]} DNI
            </tspan>
          </text>
          <rect
            x="402.5"
            y="107.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="311.5"
            y="73.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["warmińsko-mazurskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="323" y="93.2">
              {mapData["warmińsko-mazurskie"]} DNI
            </tspan>
          </text>
          <rect
            x="311.5"
            y="73.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="48.5"
            y="193.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["lubuskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="60" y="213.2">
              {mapData["lubuskie"]} DNI
            </tspan>
          </text>
          <rect
            x="48.5"
            y="193.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="147.5"
            y="179.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["wielkopolskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="159" y="199.2">
              {mapData["wielkopolskie"]} DNI
            </tspan>
          </text>
          <rect
            x="147.5"
            y="179.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="198.5"
            y="52.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["pomorskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="210" y="72.2">
              {mapData["pomorskie"]} DNI
            </tspan>
          </text>
          <rect
            x="198.5"
            y="52.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="329.5"
            y="172.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["mazowieckie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="341" y="192.2">
              {mapData["mazowieckie"]} DNI
            </tspan>
          </text>
          <rect
            x="329.5"
            y="172.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="244.5"
            y="239.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["łódzkie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="256" y="259.2">
              {mapData["łódzkie"]} DNI
            </tspan>
          </text>
          <rect
            x="244.5"
            y="239.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="389.5"
            y="360.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["podkarpackie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="401" y="380.2">
              {mapData["podkarpackie"]} DNI
            </tspan>
          </text>
          <rect
            x="389.5"
            y="360.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
          <rect
            x="180.5"
            y="298.5"
            width="61"
            height="31"
            rx="11.5"
            fill={mapData["opolskie"] > 10 ? "#28DFAE" : "#ED2369"}
          />
          <text
            fill="white"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Poppins"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0px"
          >
            <tspan x="192" y="318.2">
              {mapData["opolskie"]} DNI
            </tspan>
          </text>
          <rect
            x="180.5"
            y="298.5"
            width="61"
            height="31"
            rx="11.5"
            stroke="white"
          />
        </svg>
      ) : (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};
