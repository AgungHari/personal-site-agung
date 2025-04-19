export default function Gradient() {
    return (
      <>
        {/* Upper gradient */}
        <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#upperGradient)"
              fillOpacity=".070"
              d="M317.219 518.975 L250 600 L50 460 L317.219 530 L600 310 C650 450 300 330 400 200 C900 100 920 50 1050 100 C1180 150 1100 300 950 320 L700 280 L720 600 L400 420 Z"
            />
            <defs>
              <linearGradient
                id="upperGradient"
                x1="800.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFD700" />
                <stop offset={1} stopColor="#ADFF2F" />
              </linearGradient>
            </defs>
          </svg>
        </div>
  
        {/* Middle gradient */}
        <div className="absolute top-40 right-80 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-80">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[45deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1200 600"
          >
            <path
              fill="url(#upperGradient)"
              fillOpacity=".05"
              d="M600,300 C850,50 950,200 1100,400 C1250,600 1050,550 850,450 C650,350 350,500 150,350 C-50,200 250,100 450,250 C550,325 600,300 600,300 Z"
            />
            <defs>
              <linearGradient
                id="upperGradient"
                x1="0"
                x2="1200"
                y1="0"
                y2="600"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFD700" />
                <stop offset={1} stopColor="#ADFF2F" />
              </linearGradient>
            </defs>
          </svg>
        </div>
  
        {/* Lower gradient */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#lowerGradient)"
              fillOpacity=".1"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="lowerGradient"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFD700" />
                <stop offset={1} stopColor="#ADFF2F" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </>
    );
  }
  