<template>
    <div v-if="userExists">
        <div class="user-info">
            <div class="bg">
                <svg width="169" height="168" viewBox="0 0 169 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M93.3725 139.524C95.654 144.48 97.9355 149.352 100.217 154.308C100.47 154.812 100.724 155.4 100.724 155.988C100.724 156.24 100.132 156.828 99.9635 156.744C99.4565 156.492 98.696 156.24 98.527 155.736C96.0765 150.612 93.626 145.404 91.26 140.28C90.8375 139.44 90.4995 138.6 89.739 137.928C91.936 143.64 94.0485 149.268 96.2455 154.98C96.4145 155.484 96.7525 155.988 96.837 156.492C96.9215 156.912 96.7525 157.584 96.5835 157.668C96.0765 157.752 95.485 157.668 95.147 157.416C94.7245 156.996 94.5555 156.408 94.302 155.82C91.5135 148.68 88.725 141.624 85.683 134.484C86.6125 137.928 87.373 141.456 88.4715 144.9C89.8235 148.932 91.429 152.796 92.95 156.744C93.288 157.584 93.8795 158.676 92.5275 159.096C91.3445 159.516 90.922 158.592 90.584 157.584C88.049 149.604 85.514 141.624 82.81 133.644C83.5705 137.34 84.2465 141.036 85.176 144.648C86.19 148.848 87.4575 153.048 88.556 157.248C88.725 157.836 88.387 158.592 88.218 159.264C87.6265 158.76 86.697 158.34 86.528 157.752C84.4155 148.848 82.3875 140.028 80.444 131.124C80.0215 129.024 79.768 126.924 79.0075 124.824C79.599 129.444 79.937 134.064 80.782 138.684C81.8805 144.984 83.4015 151.284 84.669 157.584C84.838 158.256 84.331 159.012 84.162 159.768C83.655 159.264 82.81 158.76 82.641 158.088C78.416 141.456 75.881 124.656 77.6555 107.52C78.078 103.404 78.8385 99.3725 79.43 94.9205C82.303 96.5165 84.838 96.8525 87.2885 95.6765C88.6405 100.716 89.6545 105.672 91.26 110.46C95.823 123.9 104.273 134.736 115.342 143.64C115.681 143.976 116.188 144.144 116.441 144.564C116.695 144.984 116.61 145.572 116.61 146.16C116.103 146.16 115.342 146.496 115.089 146.244C112.469 143.976 109.934 141.792 107.484 139.356C105.456 137.34 103.597 135.24 101.653 133.14L101.315 133.476C105.034 137.424 108.752 141.372 112.385 145.32C112.808 145.74 113.399 146.16 113.568 146.664C113.821 147.252 113.652 147.924 113.737 148.596C113.145 148.428 112.385 148.512 112.047 148.092C108.413 144.144 104.78 140.196 101.146 136.164C100.724 135.744 100.386 135.24 99.71 135.072C103.09 139.44 106.554 143.808 109.85 148.176C110.441 148.932 112.132 149.772 110.611 150.948C109.258 151.956 108.752 150.276 108.244 149.52C105.034 145.572 101.907 141.624 98.527 137.844C101.062 141.792 103.681 145.824 106.216 149.772C106.554 150.276 106.977 150.78 107.231 151.284C107.4 151.788 107.315 152.376 107.315 152.88C106.808 152.712 106.132 152.712 105.794 152.376C104.442 150.696 103.174 149.016 101.907 147.252C100.47 145.32 99.034 143.304 97.344 141.456C99.2875 144.984 101.231 148.428 103.259 151.956C103.597 152.46 103.935 152.964 104.104 153.552C104.188 153.888 104.188 154.644 103.935 154.728C103.597 154.896 102.921 154.896 102.668 154.644C102.16 154.14 101.738 153.552 101.315 152.88C98.7805 148.344 96.33 143.892 93.795 139.356C93.626 139.356 93.5415 139.44 93.3725 139.524ZM124.722 49.2245C127.341 51.1565 129.369 53.0045 130.13 55.7765C130.806 58.1285 129.876 60.3965 127.51 61.9925C124.468 64.0085 121.088 64.3445 117.624 64.0085C113.99 63.6725 110.61 62.4965 107.737 60.3965C107.062 59.8925 106.893 58.8005 106.47 57.9605C107.315 57.7925 108.16 57.4565 108.921 57.6245C111.54 57.9605 114.244 58.7165 116.864 58.7165C122.103 58.8005 124.553 56.1125 124.722 50.9045V49.2245ZM44.7005 49.6445C44.785 50.4005 44.785 50.8205 44.785 51.1565C45.0385 56.1125 47.489 58.8005 52.4745 58.7165C55.1785 58.7165 57.8825 57.7925 60.5865 57.3725C61.4315 57.2885 62.2765 57.4565 63.1215 57.5405C62.7835 58.4645 62.6145 59.7245 61.9385 60.2285C57.0375 63.6725 51.6295 65.1845 45.7145 63.8405C38.7855 62.2445 37.2645 56.8685 42.1655 51.8285C42.8415 51.0725 43.6865 50.4845 44.7005 49.6445ZM87.88 18.1445C88.894 17.7245 89.8235 17.0525 90.753 16.9685C92.0205 16.8845 93.457 16.8845 94.5555 17.3885C95.147 17.6405 95.7385 19.1525 95.5695 19.9085C95.4005 20.6645 94.3865 21.7565 93.626 21.8405C92.0205 22.1765 90.3305 21.9245 88.556 21.9245V24.0245C87.711 23.3525 87.204 22.9325 86.6125 22.4285C84.331 20.5805 81.8805 20.1605 79.0075 21.1685C77.6555 21.6725 76.1345 21.8405 74.698 21.8405C73.177 21.8405 71.9095 21.1685 71.9095 19.4045C71.9095 17.9765 73.346 16.7165 74.9515 16.8005C75.881 16.8845 76.8105 17.2205 77.6555 17.5565C79.599 18.4805 79.937 18.3965 80.3595 16.2125C80.444 15.8765 80.3595 15.4565 80.613 15.2885C81.458 14.4485 82.3875 13.1885 83.4015 13.1045C84.4155 13.0205 85.7675 13.8605 86.528 14.6165C87.1195 15.5405 87.2885 16.8845 87.88 18.1445ZM73.2615 19.4885C74.36 20.9165 75.543 21.0005 76.8105 20.1605C77.064 19.9925 77.064 18.9845 76.8105 18.9005C75.543 18.0605 74.36 18.0605 73.2615 19.4885ZM91.8515 20.7485C92.612 20.1605 93.2035 19.7405 93.795 19.3205C93.2035 18.9005 92.612 18.1445 92.105 18.1445C91.429 18.1445 90.753 18.8165 90.077 19.2365C90.4995 19.6565 91.091 20.1605 91.8515 20.7485Z" fill="#DA9123" fill-opacity="0.43" />
                    <path d="M39.039 52.9198C37.7715 49.6438 38.7855 46.4518 41.574 44.1838C44.1935 42.0838 47.151 41.3278 50.4465 41.3278C54.08 41.3278 57.46 42.4198 60.671 44.1838C61.2625 44.5198 61.516 45.3598 62.023 45.9478C61.347 46.1158 60.5865 46.4518 59.9105 46.3678C57.798 46.1998 55.77 45.6958 53.742 45.6118C48.503 45.4438 44.1935 47.3758 40.6445 51.2398C40.1375 51.8278 39.715 52.2478 39.039 52.9198ZM130.552 51.9958C129.961 51.5758 129.623 51.4078 129.454 51.1558C123.961 45.3598 117.37 44.4358 110.019 46.3678C109.089 46.6198 107.737 47.7958 107.061 46.1998C106.892 45.7798 108.244 44.4358 109.089 43.9318C113.145 41.5798 117.539 40.3198 122.271 41.2438C126.243 42.0838 129.454 43.9318 130.552 48.2158C130.806 49.2238 130.552 50.4838 130.552 51.9958ZM100.132 32.4238C102.921 31.3318 105.287 31.1638 107.653 32.0038C110.864 33.1798 112.385 37.0438 110.864 40.4038C109.596 43.4278 106.132 44.9398 103.428 43.6798C101.738 42.9238 101.484 42.0838 102.752 40.6558C102.921 40.4878 103.005 40.3198 103.174 40.2358C106.047 36.7918 105.625 34.8598 101.569 33.0958C101.231 32.8438 100.893 32.7598 100.132 32.4238ZM81.627 83.4958V77.5318H85.0915V83.1598C88.556 85.6798 89.4855 87.6958 88.4715 90.3838C87.711 92.5678 85.4295 94.0798 83.148 93.9118C80.782 93.7438 78.8385 92.0638 78.247 89.7958C77.571 87.2758 78.754 85.1758 81.627 83.4958ZM86.021 91.1398C86.021 89.8798 85.9365 88.8718 86.021 87.9478C86.2745 86.1838 85.345 85.8478 83.9085 86.0158C82.5565 86.1838 80.6975 85.1758 80.782 87.9478C80.8665 91.1398 80.6975 91.2238 83.993 91.2238C84.5845 91.1398 85.0915 91.1398 86.021 91.1398ZM67.1775 32.2558C62.023 35.1118 61.9385 35.8678 65.6565 40.6558C66.248 41.4118 66.6705 42.8398 66.3325 43.5118C65.9945 44.1838 64.558 44.6038 63.6285 44.5198C59.4035 44.1838 56.1925 38.6398 58.0515 34.8598C58.643 33.6838 59.995 32.4238 61.178 32.0878C63.037 31.4998 65.1495 31.7518 67.1775 31.5838V32.2558ZM57.291 70.8118C57.8825 70.8958 58.474 71.0638 58.981 71.1478C62.361 71.9038 65.4875 71.5678 68.107 69.2998C69.29 68.2918 70.0505 68.5438 70.98 69.4678C71.9095 70.3918 72.332 71.3998 71.5715 72.6598C69.3745 75.9358 62.9525 77.5318 59.488 75.6838C57.629 74.7598 56.953 73.2478 57.291 70.8118ZM112.3 70.3918C112.892 72.9118 112.131 74.5078 109.85 75.6838C106.47 77.4478 100.555 76.1878 98.1045 73.3318C97.0905 72.0718 97.513 70.9798 98.4425 69.9718C99.2875 68.9638 100.132 68.7958 101.315 69.6358C104.104 71.6518 107.23 71.9878 110.526 70.8118C110.948 70.6438 111.455 70.4758 111.878 70.3918C112.047 70.3078 112.216 70.3918 112.3 70.3918ZM90.3305 33.6838C87.2885 29.9878 83.655 27.8878 79.599 26.3758C78.8385 26.1238 78.1625 24.7798 78.1625 23.9398C78.1625 23.2678 79.092 22.4278 79.768 22.0078C80.275 21.6718 81.12 21.6718 81.7115 21.9238C84.669 22.8478 87.2885 24.2758 89.1475 26.7958C90.6685 28.7278 91.091 30.9118 90.3305 33.6838ZM84.4155 42.8398C82.8945 40.7398 81.458 39.0598 80.444 37.2118C79.43 35.3638 81.12 34.1878 82.2185 33.0118C83.317 31.7518 84.7535 31.5838 86.19 32.5078C88.725 34.1878 89.1475 36.3718 87.373 38.8078C86.4435 39.9838 85.5985 41.2438 84.4155 42.8398ZM95.7385 40.7398C95.654 42.7558 91.8515 47.5438 90.415 47.5438C89.401 47.5438 88.1335 46.8718 87.373 46.1158C86.866 45.6118 86.697 44.0158 87.1195 43.5118C88.387 41.8318 89.8235 40.2358 91.429 38.8918C91.936 38.4718 93.288 38.5558 93.964 38.8918C94.8935 39.3118 95.4005 40.3198 95.7385 40.7398ZM79.599 47.2078C77.909 46.8718 75.4585 44.7718 74.7825 42.9238C74.1065 41.1598 74.6135 39.0598 76.219 38.1358C76.895 37.7158 78.247 37.7998 78.8385 38.2198C80.0215 39.1438 81.0355 40.3198 81.965 41.5798C82.5565 42.3358 83.2325 43.7638 82.979 44.2678C82.134 45.5278 80.782 46.2838 79.599 47.2078ZM87.6265 74.2558C85.683 77.1118 83.4015 77.6158 80.444 75.8518C80.106 75.6838 79.6835 75.4318 79.43 75.1798C78.5005 74.0878 77.6555 72.9958 76.726 71.9038C77.909 71.0638 79.0075 70.1398 80.1905 69.3838C80.5285 69.1318 81.3735 69.2998 81.7115 69.5518C83.7395 70.9798 85.5985 72.5758 87.6265 74.2558ZM69.5435 62.8318C68.952 62.4958 68.276 62.4118 67.938 61.9918C67.0085 60.7318 66.079 59.3878 65.4875 57.8758C64.8115 56.3638 65.403 55.0198 66.924 54.1798C68.445 53.3398 69.5435 53.2558 70.473 55.1038C71.149 56.4478 72.0785 57.7078 73.008 58.8838C74.1065 60.3118 73.7685 61.1518 72.2475 61.7398C71.4025 62.0758 70.473 62.4118 69.5435 62.8318ZM102.752 64.0078C103.343 61.3198 104.442 60.5638 106.639 60.9838C109.427 61.5718 111.54 63.2518 112.892 65.6878C113.737 67.1998 113.23 68.7118 111.709 69.3838C111.286 69.5518 110.272 69.4678 110.019 69.1318C108.329 66.5278 105.878 64.7638 102.752 64.0078ZM88.3025 50.5678C88.3025 52.0798 85.514 55.0198 84.162 55.0198C83.0635 55.0198 80.3595 51.5758 80.3595 50.2318C80.3595 48.8878 83.148 46.1158 84.5 46.1158C85.852 46.0318 88.3025 48.9718 88.3025 50.5678ZM82.134 57.8758C83.486 59.8078 84.7535 61.6558 86.1055 63.4198C87.1195 64.7638 86.4435 65.6878 85.345 66.4438C84.331 67.1998 83.317 68.4598 81.965 66.7798C81.289 65.8558 80.444 65.0998 79.768 64.1758C77.6555 60.9838 78.416 58.9678 82.134 57.8758ZM66.6705 64.1758C63.2905 64.9318 60.7555 66.7798 59.0655 69.7198C56.6995 68.6278 56.108 67.1998 57.2065 65.2678C58.474 63.0838 60.333 61.5718 62.868 61.0678C65.1495 60.5638 66.3325 61.4878 66.6705 64.1758ZM75.7965 61.8238C76.895 63.5038 77.909 65.0998 78.923 66.7798C79.092 67.0318 79.1765 67.4518 79.092 67.7038C78.6695 69.3838 74.7825 70.6438 73.515 69.3838C69.29 65.1838 69.2055 64.5958 74.191 62.5798C74.7825 62.3278 75.205 62.0758 75.7965 61.8238ZM94.8935 69.2158C94.302 68.8798 94.0485 68.7958 93.8795 68.7118C89.401 65.4358 89.4855 63.9238 94.5555 60.7318C95.0625 60.3958 96.499 61.0678 97.2595 61.5718C98.4425 62.4118 99.203 63.6718 98.358 65.0158C97.4285 66.5278 96.0765 67.7878 94.8935 69.2158ZM105.287 51.3238C101.146 51.9118 98.4425 50.6518 97.006 47.5438C96.33 46.0318 96.5835 44.7718 97.851 43.8478C98.2735 43.5118 99.203 43.3438 99.541 43.5958C102.329 45.4438 104.188 48.1318 105.287 51.3238ZM76.726 50.3158C78.078 52.0798 80.8665 53.1718 80.106 55.6078C79.768 56.7838 77.3175 57.7918 75.7965 57.9598C73.515 58.2118 73.346 55.6918 72.332 54.2638C71.994 53.7598 72.0785 53.6758 76.726 50.3158ZM85.007 57.5398C86.7815 56.1958 88.3025 55.0198 89.908 53.6758C90.8375 54.9358 91.8515 56.1118 92.6965 57.3718C92.95 57.7078 92.95 58.3798 92.6965 58.7998C90.753 62.6638 88.3025 62.8318 85.9365 59.3878C85.5985 58.7998 85.345 58.2118 85.007 57.5398ZM100.639 61.9918C99.034 61.0678 97.2595 60.5638 97.344 58.3798C97.4285 56.8678 100.386 53.6758 101.822 53.6758C102.752 53.6758 103.935 54.0118 104.442 54.5998C104.78 55.1038 104.526 56.3638 104.104 57.0358C103.09 58.7158 101.907 60.2278 100.639 61.9918ZM72.4165 49.9798C70.5575 49.9798 69.121 48.6358 68.783 46.6198C68.5295 44.8558 69.797 42.3358 71.2335 41.9998C71.5715 41.9158 72.2475 41.9998 72.4165 42.2518C73.4305 43.6798 74.4445 45.1078 75.1205 46.6198C75.9655 48.4678 74.529 50.0638 72.4165 49.9798ZM99.203 52.0798C97.5975 53.9278 96.4145 55.2718 94.8935 56.9518C93.7105 54.9358 92.612 53.3398 91.8515 51.5758C91.5135 50.9038 91.767 49.7278 92.105 48.9718C92.95 47.2918 93.795 47.2918 95.147 48.6358C96.4145 49.8118 97.682 50.8198 99.203 52.0798ZM60.7555 54.7678C58.2205 58.0438 51.2915 57.6238 49.4325 54.3478C48.334 52.4158 48.841 51.7438 52.3055 50.8198C53.3195 55.3558 57.122 54.5158 60.7555 54.7678ZM117.455 49.8958C118.722 50.9878 120.243 51.6598 120.497 52.5838C120.835 54.2638 119.398 55.3558 117.877 55.9438C115.511 56.8678 113.061 57.0358 110.61 56.0278C109.934 55.7758 109.427 55.1038 108.498 54.3478C112.131 53.9278 116.018 55.1038 117.455 49.8958Z" fill="#DA9123" fill-opacity="0.43" />
                    <path d="M75.2895 35.6999C72.163 38.4719 70.135 38.6399 65.3185 35.0279C67.6845 31.6679 72.501 32.0039 75.2895 35.6999ZM90.077 73.1639C88.3025 72.4079 86.7815 71.7359 85.2605 70.9799C85.007 70.8959 84.7535 70.4759 84.7535 70.1399C84.669 67.8719 87.1195 67.8719 88.1335 66.6119C88.3025 66.4439 89.401 66.6119 89.739 66.9479C90.4995 67.5359 91.091 68.2919 91.598 69.0479C92.0205 69.7199 92.6965 70.8119 92.5275 71.1479C92.0205 72.0719 91.0065 72.4919 90.077 73.1639ZM101.738 34.6079C99.7945 35.9519 98.1045 37.1279 96.33 38.4719C95.5695 37.7999 94.809 37.0439 94.0485 36.3719C92.6965 35.1119 92.8655 34.1879 94.5555 33.4319C97.0905 32.1719 99.372 33.0959 101.738 34.6079ZM69.121 51.3239C67.769 52.0799 66.5015 52.9199 65.234 53.4239C64.8115 53.5919 63.7975 53.2559 63.6285 52.8359C62.192 50.0639 63.4595 47.6279 66.8395 46.7039C67.6 48.2159 68.3605 49.7279 69.121 51.3239ZM77.064 34.1879C75.712 31.1639 75.9655 29.0639 78.1625 26.9639C79.5145 28.0559 80.8665 29.1479 82.472 30.5759C80.5285 31.9199 78.923 33.0119 77.064 34.1879ZM59.826 50.3999C56.108 49.0559 52.6435 48.8879 49.179 50.5679C49.6015 48.5519 50.6155 47.7959 52.897 47.4599C55.6855 46.9559 58.3895 48.0479 59.826 50.3999ZM120.413 50.0639C117.033 48.6359 113.568 48.5519 110.019 49.8119C110.864 48.1319 112.301 47.2919 114.667 47.2079C116.948 47.2079 119.23 47.5439 120.413 50.0639Z" fill="#DA9123" fill-opacity="0.43" />
                </svg>
            </div>

            <div class="menu" v-if="isSelf">
                <div class="messages" @click="router.push({ name: 'notificationsHome' })">
                    <mdiEmailOutline />
                    <div class="badge" v-if="unreadCount">{{ unreadCount > 99 ? '99+' : unreadCount }}</div>
                </div>
                <div @click="menuOpen = true">
                    <mdiMenu />
                </div>
            </div>
            <div class="menu menu-back" v-else>
                <div @click="router.back()">
                    <mdiChevronLeft />
                </div>
            </div>

            <div class="user" v-if="user">
                <div class="top">
                    <img :src="user.avatarUrl">

                    <div class="main">
                        <div class="name">
                            {{ user.nickName }}
                            <span v-if="isSelf" @click="changeName()">
                                <el-icon>
                                    <EditPen />
                                </el-icon>
                            </span>
                        </div>
                        <div class="other-info">
                            <div>UID: {{ user.id }}</div>
                            <div>IP属地: {{ }}</div>
                        </div>
                    </div>

                    <div class="action" v-if="!isSelf">
                        <template v-if="!User.isSelf(user.id)">
                            <el-button type="primary" v-if="!Self.FollowController.following.includes(user.id)" @click="setFollowing(true)">关注</el-button>
                            <el-button type="primary" plain v-else-if="!Self.FollowController.followers.includes(user.id)" @click="setFollowing(false)">已关注</el-button>
                            <el-button type="primary" plain v-else @click="setFollowing(false)">已互粉</el-button>
                        </template>
                        <el-button v-else type="primary" plain @click="router.push({ name: 'self' })">查看个人视角</el-button>
                    </div>
                </div>

                <div class="signature">{{ user.signature }}</div>

                <div class="bottom">
                    <div>
                        <TagsEditor v-model="userTags" :editable="isSelf"></TagsEditor>

                        <div class="user-type">
                            <span :class="['gray', 'purple', 'gold', 'green'].at(user.userType)">{{ user.userType ? '身份认证: ' : '' }}{{ ['普通用户', '媒体', '非遗传承人', '管理员'].at(user.userType) }}</span>
                        </div>
                    </div>

                    <div class="social-status">
                        <div @click="isSelf && router.push({ name: 'selfFollowers' })">
                            <div class="number">{{ humanizeNumber(user.fans) }}</div>
                            <div>粉丝</div>
                        </div>
                        <div @click="router.push({ name: isSelf ? 'selfFollowing' : 'userFollowing' })">
                            <div class="number">{{ humanizeNumber(user.idols) }}</div>
                            <div>关注</div>
                        </div>
                        <div @click="">
                            <div class="number">{{ humanizeNumber(user.likes) }}</div>
                            <div>获赞</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="entry-button">
                <div v-if="user && user.userType" @click="">
                    <div class="text-main">
                        <mdiStore />非遗工坊
                    </div>
                    <div class="text-secondary">在售商品管理</div>
                </div>

                <div v-if="isSelf" @click="">
                    <div class="text-main">
                        <mdiLightbulbOutline />创作中心
                    </div>
                    <div class="text-secondary">投稿收益管理</div>
                </div>

                <div v-if="user && user.userType" @click="">
                    <div class="text-main">
                        <mdiBookOpenVariantOutline />非遗课程
                    </div>
                    <div class="text-secondary">课程收益管理</div>
                </div>
            </div>

            <el-tabs class="tabs outline sticky" v-model="tabs.current">
                <el-tab-pane v-for="tab in tabs.tabs" :label="tab.name" :name="tab.name">
                    <ContentListContainer v-if="tab.data" v-model="tab.data.response">

                        <PostListItemSelf v-if="tab.name == tabNames.posts" v-for="post in tab.data.response.data" :post="post" :reload-action="() => tabs.loadTab()" :self="isSelf" />
                        <CommentQuoteReply v-if="tab.name == tabNames.comments" v-for="comment in tab.data.response.data" :comment="comment" />
                        <PostListItem class="post" v-if="tab.name == tabNames.favorites" v-for="post in tab.data.response.data" :post="post" />

                    </ContentListContainer>

                    <el-tabs v-else v-model="activityTabs.current" class="solid border" style="margin-top: 4px;">
                        <el-tab-pane v-for="activityTab in activityTabs.tabs" :label="activityTab.name" :name="activityTab.name">
                            <ContentListContainer v-model="activityTab.data.response">

                                <ActivityListItem v-for="a in activityTab.data.response.data" :activity="a" :bottom="activityTab.name == activityTabNames.joined ? 'detail' : undefined" />
                            </ContentListContainer>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
            </el-tabs>
        </div>

        <DrawerMenu v-model="menuOpen" />
    </div>

    <ErrorPage v-else message="用户不存在" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed, reactive } from 'vue'
import * as Self from '@/axios/api/self'
import { useRoute } from 'vue-router';
import TagsEditor from '@/components/slot/TagsEditor.vue';
import { humanizeNumber, promiseSuccess, splitStringBySpace } from '@/utils'
import * as Posts from '@/axios/api/posts'
import PostListItemSelf from '@/components/posts/PostListItemSelf.vue'
import PostListItem from '@/components/posts/PostListItem.vue'
import CommentQuoteReply from '@/components/posts/CommentQuoteReply.vue';
import * as Activity from '@/axios/api/activity'
import * as ExampleData from '@/axios/example-data'
import ActivityListItem from '@/components/activity/ActivityListItem.vue';
import DrawerMenu from '@/components/menu/DrawerMenu.vue';
import * as Notifications from '@/axios/api/notifications'
import router from '@/router';
import * as User from '@/axios/api/user'
import { Response } from '@/axios/api/common';
import ContentListContainer from '@/components/slot/ContentListContainer.vue';
import { AxiosResponse } from 'axios';
import ErrorPage from '../error/ErrorPage.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const { userId } = defineProps<{
    userId: string
}>()

const route = useRoute()

watch(() => route.name, name => {
    if (name == 'self') {
        loadUser()
        loadUnreads()
    }
})


const user = ref<Self.Self | null>()
const userTags = ref<string[]>([])  // 不能用 computed 从 user.tags 里面计算, 因为需要本地编辑

const userExists = computed(() => !(user.value && user.value.id == null))

const isSelf = computed(() => {
    if (!userId) return true
    // else if (user.value && User.isSelf(user.value.id)) return true
    else return false
})

const unreadCount = ref(0)

const menuOpen = ref(false)


//
// Tab controls
//
interface ITabController<T> {
    name?: any
    data?: {
        getSelf: () => Promise<AxiosResponse<Response<T>, any>>
        getUser: (id) => Promise<AxiosResponse<Response<T>, any>>
        dataProcessor?: (r: T) => T
        response?: Response<T>
    }
    action?: () => void
}

function createTabController(tabs: Record<any, ITabController<any>>, defaultTab?= Object.keys(tabs)[0]) {
    for (const [name, tab] of Object.entries(tabs)) {
        tab.name = name
    }
    const controller = reactive({
        current: defaultTab,
        tabs,
        loadTab() {
            const tab = this.tabs[this.current];
            if (tab.data) {
                (isSelf.value ? tab.data.getSelf() : tab.data.getUser(userId)).then(r => {
                    if (tab.data.dataProcessor) {
                        r.data.data = tab.data.dataProcessor(r.data.data)
                        tab.data.response = r.data
                    }
                })
            } else {
                tab.action()
            }
        },
        getTabName(tab: ITabController<any>) {
            return Object.entries(this.tabs).find(x => x[1] == tab)?.at(0) as string
        },
    })
    watch(() => controller.current, () => controller.loadTab()/*, { immediate: true }*/)
    return controller
}


enum tabNames {
    posts = '发布',
    comments = '评论',
    favorites = '收藏',
    activities = '活动',
}

const tabs = createTabController({
    [tabNames.posts]: {
        data: {
            getSelf: Self.getPosts,
            getUser: User.getPosts,
            dataProcessor: d => {
                return Array.isArray(d) ? d.sort((a, b) => {
                    if (a.pinned !== b.pinned) {
                        return Number(b.pinned) - Number(a.pinned); // true (1) comes before false (0)
                    }
                    return new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime(); // Sort by createdTime desc
                }) : d;
            },
        },
    } as ITabController<Posts.Post[] | string>,

    [tabNames.comments]: {
        data: {
            getSelf: Self.getComments,
            getUser: User.getComments,
            dataProcessor: reverseArray,
        }
    } as ITabController<Self.Comment[] | string>,

    [tabNames.favorites]: {
        data: {
            getSelf: Self.getFavPosts,
            getUser: User.getFavPosts,
            dataProcessor: reverseArray,
        }
    } as ITabController<Posts.Post[] | string>,

    [tabNames.activities]: {
        action: () => activityTabs.loadTab()
    } as ITabController<any>,
})


enum activityTabNames {
    joined = '我参与的',
    starred = '我收藏的',
}

const activityTabs = createTabController({
    [activityTabNames.joined]: {
        data: {
            getSelf: Self.getJoinedActivities,
            getUser: User.getJoinedActivities,
            dataProcessor: reverseArray,
        }
    },
    [activityTabNames.starred]: {
        data: {
            getSelf: Self.getStarredActivities,
            getUser: User.getStarredActivities,
            dataProcessor: reverseArray,
        }
    },
})

function reverseArray(a: any[] | unknown) {
    return Array.isArray(a) ? a.reverse() : a
}
//
// End tab controls
//


function loadUser() {
    return (isSelf.value ? Self.getSelf() : User.getUser(userId)).then(r => {
        user.value = r.data.data
        userTags.value = splitStringBySpace(r.data.data.tag)
    })
}

function loadUnreads() {
    Notifications.getUnreadCount().then(r => unreadCount.value = r.data.data)
}

function setFollowing(value: boolean) {
    promiseSuccess(value ? User.follow(user.value.id) : User.unfollow(user.value.id))
        .then(() => Self.FollowController.loadBoth())
}

function changeName() {
    ElMessageBox.prompt('输入新昵称', '修改昵称', {
        // confirmButtonText: 'OK',
        // cancelButtonText: 'Cancel',
        inputValue: user.value.nickName,
        inputPattern: /.+/,
        inputErrorMessage: '昵称不能为空',
    }).then(({ value }) => {
        promiseSuccess(Self.updateProfile({ nickName: value })).then(() => {
            ElMessage.success('修改成功')
            loadUser()
        }).catch((r: AxiosResponse<Response<any>>) => {
            ElMessage.error(r?.data?.errorMsg || r as unknown)
        })
    }).catch(() => { })
}

onMounted(() => {
    loadUser().then(() => {
        if (!userExists.value) return
        if (isSelf.value) loadUnreads()
        else Self.FollowController.loadBoth()
        tabs.loadTab()
    })
})
</script>

<style scoped lang="scss">
.user-info {
    padding: 12px 12px 24px;
    background: radial-gradient(#FFC23F94, #F6E6C591);
    position: relative;

    .bg {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
    }

    >div:not(.bg) {
        position: relative;
    }

    .menu {
        display: flex;
        align-items: center;
        justify-content: right;
        font-size: 1.5em;
        gap: 8px;

        >div {
            padding: 6px;

            svg {
                display: block;
            }
        }

        .messages {
            position: relative;

            .badge {
                position: absolute;
                top: -3px;
                right: -3px;
                border-radius: 100px;
                background-color: red;
                color: white;
                font-size: 0.5em;
                line-height: 1.5em;
                min-width: 1.5em;
                padding: 0 0.35em;
                text-align: center;
            }
        }

        &.menu-back {
            justify-content: left;
            padding-bottom: 12px;

            >div {
                padding: 2px 4px;
            }
        }
    }

    .user {
        padding: 0 8px;

        .top {
            display: flex;
            gap: 8px;

            >img {
                width: 48px;
                height: 48px;
                border-radius: 100%;
                object-fit: cover;
            }

            .main {
                flex: 1;

                .name {
                    font-size: 1.1em;

                    .el-icon {
                        vertical-align: bottom;
                        font-size: 1.25em;
                    }
                }

                .other-info {
                    padding: 4px 0;
                    font-size: 0.8em;
                    color: #666;

                    >div {
                        margin: 2px 0;
                    }
                }
            }

            .action {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }

        .signature {
            font-size: 0.9em;
        }

        .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;

            .tags-editor {
                margin: 8px 0;
                max-width: 45vw;
                flex-wrap: wrap;
            }

            .user-type {
                margin: 8px 0;

                span {
                    display: inline-block;
                    font-size: 0.9em;
                    padding: 2px 8px;
                    color: white;
                    font-weight: bold;
                    border-radius: 4px;

                    &.gray {
                        background-color: #aaa;
                    }

                    &.purple {
                        background: linear-gradient(120deg, #e21be3, #fe94ff);
                    }

                    &.gold {
                        background: linear-gradient(120deg, #ffb811, #fdd457);
                    }

                    &.green {
                        background: linear-gradient(120deg, #25dd77, #7ef1b2);
                    }
                }
            }

            .social-status {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 36px;
                font-size: 0.9em;
                text-align: center;

                .number {
                    font-size: 1.35em;
                }
            }
        }
    }
}

.card {
    background-color: white;
    border-radius: 16px 16px 0 0;
    margin-top: -16px;
    padding: 12px 0;
    position: relative;

    .entry-button {
        padding: 0 16px;
        display: flex;
        gap: 8px;

        >div {
            flex: 1;
            flex-shrink: 0;
            background-color: #eee;
            padding: 8px 0;
            margin: 4px 0;
            border-radius: 10px;
            text-align: center;
            font-size: 0.925em;

            .text-main {

                >svg {
                    font-size: 1.3em;
                    vertical-align: bottom;
                    margin-right: 2px;
                }
            }

            .text-secondary {
                margin-top: 2px;
                font-size: 0.75em;
                color: #444;
            }
        }
    }

    .tabs {
        :deep(>.el-tabs__header .el-tabs__item) {
            font-size: 1em;
        }

        .post {
            margin: 8px 12px 12px;
        }
    }
}
</style>