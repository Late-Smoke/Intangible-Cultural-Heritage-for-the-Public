<template>
    <div class="container">
        <el-icon class="back-btn" @click="router.back()">
            <ArrowLeftBold />
        </el-icon>
        <div class="avatar">
            <el-avatar :size="46" :src="user?.avatarUrl"></el-avatar>
            <div class="nickname">{{ user?.nickName }}</div>
        </div>
        <div style="display: flex;align-items: center;justify-content: center;margin-bottom: 10px;">
            <el-button v-if="isSelf" class="manage-btn" @click="isManage = !isManage">
                <span v-show="isManage">确定</span>
                <span v-show="!isManage">管理商品</span>
            </el-button>
            <div class="goods-title-icon">
                <svg width="72" height="37" viewBox="0 0 72 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.56 1.2C16.64 1.09333 16.72 0.999999 16.8 0.92C16.9067 0.839999 16.9867 0.799999 17.04 0.799999C17.0933 0.799999 17.28 0.986665 17.6 1.36C17.9467 1.70667 18.28 2.10667 18.6 2.56C18.8133 2.90666 19.3733 3.58666 20.28 4.6L20.8 5.28C21.44 6.02666 21.7467 6.42667 21.72 6.48C20.9467 6.4 19.7067 6.22667 18 5.96C16.2933 5.69333 14.9733 5.48 14.04 5.32C13.96 5.29333 13.92 5.26667 13.92 5.24C13.92 5.21333 13.9467 5.16 14 5.08L14.24 4.64C14.2933 4.50667 14.64 3.96 15.28 3C15.9467 2.04 16.3733 1.44 16.56 1.2ZM30.2 6.16C30.52 6.10667 30.7733 6.05333 30.96 6C31.1467 5.94667 31.28 5.92 31.36 5.92H31.56L31.32 7C30.9733 8.65333 30.7333 9.6 30.6 9.84C30.44 10 30.16 10.1067 29.76 10.16C28.6933 10.32 27.5067 10.4 26.2 10.4C25 10.4 23.8133 10.3467 22.64 10.24L21.28 10.16C21.2533 10.1867 21.3333 10.28 21.52 10.44C21.7067 10.6 21.9333 10.7733 22.2 10.96C23.64 12.0267 24.32 12.64 24.24 12.8C24.1867 12.88 23.3467 13.2 21.72 13.76C20.6533 14.08 20.0933 14.2933 20.04 14.4C19.96 14.4267 20.1467 14.44 20.6 14.44C21.0533 14.4133 21.5867 14.3733 22.2 14.32C22.8133 14.2667 23.5467 14.1867 24.4 14.08C25.2533 13.9467 25.7867 13.84 26 13.76C26.1333 13.7333 26.5733 13.6 27.32 13.36C27.5867 13.3067 27.88 13.2267 28.2 13.12C28.2267 13.12 28.2667 14.56 28.32 17.44C28.32 17.92 28.3333 18.28 28.36 18.52C28.4133 21.1333 28.48 23.0133 28.56 24.16L28.88 28C28.9867 29.8133 29.24 31.76 29.64 33.84L29.88 35.6L29.92 36.32H29.48L27 36.16C25.16 36.0267 23.56 35.8667 22.2 35.68C21.8533 35.6267 21.68 35.5867 21.68 35.56L22.28 35.04C22.7067 34.72 23.0667 34.3733 23.36 34C23.6533 33.6267 23.9467 33.1333 24.24 32.52C24.9333 31.16 25.28 29.32 25.28 27C25.28 26.6267 25.2533 25.9867 25.2 25.08L25.16 24.08L25.08 21.96L24.96 20.76C24.9333 20.76 24.4533 21.04 23.52 21.6C22.7733 22.0533 22.24 22.36 21.92 22.52C21.6267 22.68 21.28 22.8133 20.88 22.92L20.4 23.08L20.28 22.8C20.1467 22.5067 19.8533 21.7467 19.4 20.52C18.9467 19.2667 18.6133 18.3067 18.4 17.64L18.36 17.4H15.36L15.32 17.64L14.72 20C14.08 21.9733 13.72 23 13.64 23.08C13.5867 23.2133 13.1733 23.1067 12.4 22.76C11.6267 22.4133 10.6533 21.9067 9.48 21.24L8.96 20.96L8.84 21.76C8.78667 22.8267 8.64 24.1867 8.4 25.84C8.16 27.4933 7.92 28.84 7.68 29.88C7.44 31.0533 7.25333 32.0133 7.12 32.76C6.98667 33.5067 6.90667 34.1067 6.88 34.56C6.85333 35.2533 6.78667 35.6133 6.68 35.64C6.54667 35.6667 5.76 35.4533 4.32 35C2.88 34.5467 1.86667 34.2 1.28 33.96L0.8 33.76L1.08 33.6C1.08 33.6 1.22667 33.4533 1.52 33.16C1.57333 33.08 1.66667 32.96 1.8 32.8C1.96 32.6667 2.14667 32.48 2.36 32.24C3.24 31.2 3.94667 30.16 4.48 29.12C4.82667 28.4267 5.08 27.4533 5.24 26.2C5.42667 24.92 5.57333 22.92 5.68 20.2C5.78667 18.9733 5.89333 17.48 6 15.72C6 15.56 6 15.36 6 15.12C6.02667 14.88 6.05333 14.72 6.08 14.64C6.13333 14.56 6.22667 14.52 6.36 14.52C6.46667 14.52 6.88 14.44 7.6 14.28C8.48 14.4933 9.52 14.6667 10.72 14.8C11.9467 14.9333 13.0667 15 14.08 15C14.1867 15 14.24 14.9867 14.24 14.96C14.24 14.9067 13.9467 14.8 13.36 14.64L11.28 13.96L9.48 13.32C9.34667 13.2667 9.21333 13.2133 9.08 13.16C8.97333 13.1067 8.90667 13.0667 8.88 13.04C8.88 12.9867 9.34667 12.4933 10.28 11.56C10.8133 11.08 11.2933 10.6 11.72 10.12C11.72 10.0667 11.5467 10.0667 11.2 10.12L5.08 10.24C4.41333 10.2933 3.82667 10.36 3.32 10.44C2.81333 10.52 2.45333 10.5867 2.24 10.64C2.16 10.6667 2.09333 10.6667 2.04 10.64C2.01333 10.5867 1.98667 10.5067 1.96 10.4L1.48 9.36C0.813334 7.84 0.493334 7.08 0.52 7.08L1.8 7.32C3.16 7.56 6.36 7.68 11.4 7.68C12.0133 7.68 13.1467 7.65333 14.8 7.6C18.6133 7.52 21.44 7.33333 23.28 7.04C23.4933 7.04 23.7067 7.02667 23.92 7C24.16 6.97333 24.3733 6.94666 24.56 6.92L26.08 6.8C26.8533 6.72 27.5733 6.64 28.24 6.56C28.9333 6.45333 29.5867 6.32 30.2 6.16ZM18.44 9.88C17.88 9.82667 16.8933 9.8 15.48 9.8C13.72 9.8 12.7867 9.85333 12.68 9.96L13.12 10.92C14.3467 13.3733 15.0133 14.6533 15.12 14.76C15.2 14.84 15.2933 14.88 15.4 14.88L16.2 14.8L17.6 14.64C17.6267 14.64 17.68 14.64 17.76 14.64C17.8667 14.6133 18.04 14.36 18.28 13.88C18.5467 13.4 18.88 12.7467 19.28 11.92C19.3867 11.68 19.52 11.4267 19.68 11.16C19.84 10.8667 19.96 10.6133 20.04 10.4C20.12 10.24 20.1333 10.1333 20.08 10.08C20.0267 10 19.48 9.93333 18.44 9.88ZM24.72 16.96L24.24 17.04L22.44 17.12C21.24 17.2533 20.4667 17.32 20.12 17.32C19.72 17.3467 19.4533 17.3733 19.32 17.4C19.2133 17.4267 19.2133 17.48 19.32 17.56C20.1467 18.2267 21.68 18.9867 23.92 19.84C24.2667 20 24.5333 20.1067 24.72 20.16C24.9067 20.1867 24.9733 20.1467 24.92 20.04L24.88 19.2C24.88 18.6667 24.8533 18.16 24.8 17.68L24.72 16.96ZM10.68 17.28C10.3333 17.28 10.1067 17.2933 10 17.32C9.92 17.3467 9.84 17.4267 9.76 17.56C9.57333 18.0133 9.44 18.4133 9.36 18.76C9.2 19.3733 9.10667 19.68 9.08 19.68C9.02667 19.7333 9 19.88 9 20.12C9 20.36 9.01333 20.48 9.04 20.48C9.12 20.48 10.0267 20.0667 11.76 19.24C12.2133 19 12.7867 18.6667 13.48 18.24C14.1733 17.8133 14.5333 17.5467 14.56 17.44C14.48 17.44 14.2933 17.4267 14 17.4C13.7333 17.3733 13.3867 17.36 12.96 17.36L10.68 17.28ZM21.44 23.2C21.52 23.12 21.6 23.08 21.68 23.08C21.7333 23.08 21.7733 23.12 21.8 23.2C21.8267 23.2533 21.84 23.3467 21.84 23.48C21.84 24.36 21.8133 25.04 21.76 25.52C21.7333 26 21.68 26.48 21.6 26.96L21.44 29.4C21.44 29.5333 21.3867 29.6533 21.28 29.76C21.2267 29.8133 20.8267 29.88 20.08 29.96C19.3333 30.0133 18.5467 30.04 17.72 30.04C16.4667 30.04 15.3467 30.0667 14.36 30.12C13.4 30.1733 12.88 30.24 12.8 30.32C12.64 30.48 12.56 29.7867 12.56 28.24C12.56 27.4933 12.5067 26.5733 12.4 25.48C12.32 24.36 12.24 23.7333 12.16 23.6L12.12 23.52C12.12 23.4667 12.1733 23.44 12.28 23.44L12.8 23.52C13.6533 23.5733 14.9867 23.6 16.8 23.6C17.9733 23.6 18.6933 23.5867 18.96 23.56L20.56 23.4C21.0133 23.4 21.3067 23.3333 21.44 23.2ZM19.44 25.84L17.12 25.8H14.72V27.96H16.92C17.6667 27.9867 18.2267 28 18.6 28C19 27.9733 19.2 27.96 19.2 27.96C19.3067 27.9333 19.3867 27.3333 19.44 26.16V25.84ZM63.36 6.16H63.64L63.52 10.8C63.4933 13.5467 63.4667 15.3067 63.44 16.08C63.4133 16.8267 63.3467 17.2267 63.24 17.28C62.44 17.28 61.6133 17.2533 60.76 17.2C59.4 17.12 57.9067 17.08 56.28 17.08C55.4 17.08 54.5067 17.1067 53.6 17.16C53.0133 17.2133 52.32 17.24 51.52 17.24C50.6667 17.2933 50.2133 17.3467 50.16 17.4C50.08 17.48 50 17.5067 49.92 17.48C49.84 17.4533 49.8133 17.3867 49.84 17.28C49.8667 17.2533 49.88 17.2133 49.88 17.16L49.8 16.8C49.7467 16.64 49.72 15.8 49.72 14.28C49.72 12.76 49.6267 10.7867 49.44 8.36C49.36 8.06666 49.32 7.73333 49.32 7.36C49.2933 7.06667 49.2667 6.88 49.24 6.8C49.2133 6.69333 49.1467 6.64 49.04 6.64C48.9333 6.64 48.88 6.6 48.88 6.52C48.88 6.44 49 6.42667 49.24 6.48C49.9867 6.58667 51.8933 6.64 54.96 6.64C58.08 6.64 60.12 6.58667 61.08 6.48C61.3733 6.45333 61.6533 6.41333 61.92 6.36C62.1867 6.30667 62.4 6.28 62.56 6.28C62.8 6.28 62.9467 6.25333 63 6.2L63.36 6.16ZM58.08 9.52C57.3333 9.46667 56.3333 9.44 55.08 9.44C54.1467 9.44 53.5867 9.46667 53.4 9.52C53.24 9.52 53.12 9.56 53.04 9.64C52.9867 9.77333 53 10.48 53.08 11.76C53.16 13.0133 53.24 13.6667 53.32 13.72C53.3467 13.7733 53.64 13.8133 54.2 13.84C54.76 13.84 55.5867 13.84 56.68 13.84C58.0933 13.84 59 13.84 59.4 13.84C59.8267 13.8133 60.0533 13.8 60.08 13.8C60.16 13.7733 60.2 13.5867 60.2 13.24C60.2267 12.8667 60.24 12.3333 60.24 11.64V9.56L58.08 9.52ZM71.08 20.16C71.1067 20.16 71.1333 20.16 71.16 20.16C71.2133 20.1333 71.28 20.12 71.36 20.12H71.6L71.52 25C71.52 27.96 71.48 29.84 71.4 30.64L71.36 31.32L70.08 31.24C68.48 31.16 67.52 31.12 67.2 31.12C66.7467 31.0667 65.9867 31.04 64.92 31.04C63.8267 31.04 62.9867 31.0667 62.4 31.12C61.92 31.1733 61.3067 31.2 60.56 31.2C59.84 31.2533 59.3867 31.3067 59.2 31.36C59.0667 31.4133 58.9867 31.44 58.96 31.44C58.9333 31.4133 58.92 31.3333 58.92 31.2C58.92 29.7867 58.8933 28.3467 58.84 26.88C58.8133 25.3867 58.7733 24.56 58.72 24.4C58.6667 23.9467 58.6133 23.2667 58.56 22.36C58.5067 21.8 58.4533 21.4 58.4 21.16C58.3733 20.8933 58.32 20.72 58.24 20.64C58.1867 20.6133 58.1467 20.5733 58.12 20.52C58.0933 20.4667 58.0933 20.44 58.12 20.44H58.2L58.88 20.52C59.36 20.5733 60.3467 20.6 61.84 20.6H63.84C65.28 20.6 66.4267 20.6 67.28 20.6C68.1333 20.5733 68.7733 20.52 69.2 20.44L70.64 20.28C70.8533 20.28 71 20.24 71.08 20.16ZM66.52 23.48C64.9733 23.4267 64 23.4 63.6 23.4C62.9067 23.4 62.4267 23.4267 62.16 23.48L61.92 23.52V24.44C61.9733 26.4667 62.0533 27.56 62.16 27.72C62.1867 27.7733 63.2 27.8 65.2 27.8C66.48 27.8 67.3067 27.8 67.68 27.8C68.08 27.7733 68.2933 27.76 68.32 27.76C68.3733 27.7333 68.4133 27.5467 68.44 27.2C68.4667 26.8267 68.48 26.2933 68.48 25.6V23.52L66.52 23.48ZM55.6 20.56C55.6 20.5333 55.72 20.52 55.96 20.52H56.2L56.16 25.32C56.16 28.1467 56.12 30 56.04 30.88L56 31.64H55.56C54.84 31.64 53.8533 31.5867 52.6 31.48C51 31.4267 49.9867 31.4 49.56 31.4C49.1067 31.4 48.1333 31.4267 46.64 31.48C46.1333 31.56 45.4933 31.6 44.72 31.6C44.0533 31.6533 43.68 31.6933 43.6 31.72C43.52 31.8 43.44 31.84 43.36 31.84C43.3067 31.84 43.28 31.32 43.28 30.28C43.2533 29.2133 43.2133 28.1067 43.16 26.96C43.1067 25.7867 43.0667 24.8933 43.04 24.28L42.88 22.68C42.8267 22.0667 42.7867 21.64 42.76 21.4C42.7333 21.1333 42.6667 21 42.56 21C42.4533 21 42.4 20.9467 42.4 20.84C42.4 20.8133 42.5067 20.8 42.72 20.8C43.3333 20.9333 45.2 21 48.32 21C51.1467 21 52.9867 20.9467 53.84 20.84L55.24 20.64C55.4267 20.64 55.5467 20.6133 55.6 20.56ZM51.52 23.88C50.88 23.8267 49.8533 23.8 48.44 23.8C47.32 23.8 46.7067 23.8267 46.6 23.88L46.32 23.92V24.96C46.3733 26.9333 46.4533 27.9733 46.56 28.08C46.5867 28.1333 46.8667 28.1733 47.4 28.2C47.96 28.2 48.7333 28.2 49.72 28.2C50.52 28.2 51.2 28.1867 51.76 28.16C52.3467 28.1333 52.7333 28.1067 52.92 28.08C52.9733 28.0533 53 27.8667 53 27.52C53.0267 27.1467 53.04 26.6267 53.04 25.96V23.92L51.52 23.88Z"
                        fill="#B19780" />
                </svg>
            </div>
        </div>
        <el-dialog v-model="dialogAddGoods" fullscreen draggable custom-class="dialog-addGoods" title="发布商品"
            :before-close="handleCloseAddGoods">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
                label-width="auto" class="goods-form">
                <el-form-item label="" prop="img">
                    <ImageUpload v-model="fileList" />
                </el-form-item>
                <el-form-item class="small-form" label="" prop="name">
                    <el-input class="small-input" v-model="ruleForm.name" placeholder="此处填写商品名称(必填)"
                        autocomplete="off" />
                </el-form-item>
                <el-form-item class="small-form" label="" prop="link">
                    <el-input class="small-input" v-model="ruleForm.link" placeholder="在此输入商品链接(必填)"
                        autocomplete="off" />
                </el-form-item>
                <el-form-item class="big-form" label="" prop="describe">
                    <el-input class="big-input" v-model="ruleForm.describe" type="textarea" :rows="rows"
                        placeholder="商品描述" autocomplete="off" />
                    <svg class="big-svg" width="141" height="142" viewBox="0 0 141 142" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M70.6928 133.125H52.2003C49.171 133.125 46.4584 131.433 45.109 128.702C38.7337 115.819 23.7387 85.3111 22.0037 80.1664C20.7369 76.4084 19.8557 69.6273 21.2189 61.9033C22.0037 57.4658 23.4495 53.1947 25.515 49.201C27.9384 44.5139 31.2431 40.215 35.3189 36.4154C41.763 30.4109 43.0023 26.4865 42.9059 24.2539C42.837 22.7146 42.1072 21.3695 40.7165 20.2879C40.2208 19.8996 39.6012 19.6223 38.8852 19.4697C36.2552 18.8873 34.4101 16.7379 34.4101 14.2418C34.4101 11.2742 37.0401 8.86133 40.2621 8.86133H100.848C104.07 8.86133 106.7 11.2742 106.7 14.2418C106.7 17.2094 104.07 19.6223 100.848 19.6223C99.5124 19.6223 98.4384 18.5406 98.4384 17.1955C98.4384 15.8504 99.5124 14.7687 100.848 14.7687C101.495 14.7687 101.881 14.4082 101.881 14.2418C101.881 14.0754 101.481 13.7287 100.848 13.7287H40.2621C39.615 13.7287 39.2294 14.0893 39.2294 14.2557C39.2294 14.3666 39.4635 14.6439 39.9179 14.741C41.3499 15.06 42.6167 15.6424 43.6907 16.4744C45.4532 17.8611 47.5738 20.2879 47.739 24.0736C47.9318 28.8023 44.8612 34.1551 38.6098 39.9932C31.7801 46.3582 27.5391 54.0268 25.9831 62.7631C24.3996 71.749 26.3549 77.9338 26.5752 78.6133C27.9246 82.5793 39.2707 105.973 49.4326 126.552C49.9559 127.62 51.0161 128.286 52.2003 128.286H70.6928C72.0284 128.286 73.1025 129.367 73.1025 130.712C73.1025 132.057 72.0147 133.125 70.6928 133.125Z"
                            fill="#D0D0D0" fill-opacity="0.48" />
                        <path
                            d="M88.8961 133.125H70.4174C69.0817 133.125 68.0077 132.043 68.0077 130.698C68.0077 129.353 69.0817 128.271 70.4174 128.271H88.9098C90.094 128.271 91.1543 127.606 91.6775 126.538C101.853 105.973 113.199 82.5791 114.535 78.5992C114.769 77.9197 116.724 71.7488 115.127 62.749C113.585 53.9988 109.33 46.3441 102.5 39.9791C96.2352 34.141 93.1646 28.7883 93.3712 24.0596C93.4538 21.9795 94.2249 18.9703 97.4194 16.4604C98.4797 15.6283 99.7465 15.032 101.192 14.727C101.647 14.6299 101.881 14.3525 101.881 14.2416C101.881 14.0891 101.495 13.7146 100.848 13.7146H40.2621C38.9264 13.7146 37.8524 12.633 37.8524 11.2879C37.8524 9.94277 38.9264 8.875 40.2621 8.875H100.848C104.07 8.875 106.7 11.2879 106.7 14.2555C106.7 16.7516 104.855 18.901 102.225 19.4834C101.495 19.6498 100.876 19.9133 100.394 20.3016C99.0029 21.3971 98.2594 22.7283 98.2043 24.2676C98.1079 26.5002 99.3471 30.4107 105.791 36.4291C109.867 40.2287 113.158 44.5275 115.595 49.2146C117.661 53.1945 119.106 57.4656 119.891 61.917C121.254 69.641 120.387 76.4221 119.106 80.1801C117.371 85.3248 102.363 115.833 96.0011 128.715C94.638 131.433 91.9254 133.125 88.8961 133.125Z"
                            fill="#D0D0D0" fill-opacity="0.48" />
                        <path
                            d="M94.101 124.666H45.4945C44.1589 124.666 43.0848 123.584 43.0848 122.239C43.0848 120.894 44.1589 119.813 45.4945 119.813H94.101C95.4366 119.813 96.5106 120.894 96.5106 122.239C96.5106 123.584 95.4228 124.666 94.101 124.666ZM115.031 81.9551H25.6664C24.3307 81.9551 23.2567 80.8735 23.2567 79.5283C23.2567 78.1832 24.3307 77.1016 25.6664 77.1016H115.031C116.366 77.1016 117.44 78.1832 117.44 79.5283C117.44 80.8735 116.353 81.9551 115.031 81.9551ZM112.414 52.002C112.401 52.002 112.401 52.002 112.414 52.002C112.194 52.002 91.3333 51.891 70.7065 51.7801C58.5893 51.7108 48.9231 51.6414 41.9833 51.5998C37.8524 51.5721 34.6579 51.5444 32.4685 51.5166C28.2964 51.475 28.2964 51.475 27.7456 51.1977C26.5614 50.6014 26.0795 49.1453 26.6716 47.9389C27.1397 47.0098 28.1036 46.5106 29.0812 46.6076C31.9315 46.7186 90.094 47.0375 112.428 47.1485C113.764 47.1485 114.838 48.244 114.824 49.5891C114.81 50.9203 113.736 52.002 112.414 52.002ZM49.2123 73.4961H23.7386C22.403 73.4961 21.329 72.4145 21.329 71.0694C21.329 69.7242 22.403 68.6426 23.7386 68.6426H46.8026V64.2744C46.8026 62.9293 47.8766 61.8477 49.2123 61.8477C50.5479 61.8477 51.6219 62.9293 51.6219 64.2744V71.0694C51.6219 72.4145 50.5342 73.4961 49.2123 73.4961ZM83.223 73.4961H57.7494C56.4137 73.4961 55.3397 72.4145 55.3397 71.0694V64.0664C55.3397 62.7213 56.4137 61.6397 57.7494 61.6397C59.085 61.6397 60.1591 62.7213 60.1591 64.0664V68.6426H80.8134V64.2744C80.8134 62.9293 81.8874 61.8477 83.223 61.8477C84.5587 61.8477 85.6327 62.9293 85.6327 64.2744V71.0694C85.6327 72.4145 84.5449 73.4961 83.223 73.4961Z"
                            fill="#D0D0D0" fill-opacity="0.48" />
                        <path
                            d="M74.8236 66.8408C73.488 66.8408 72.4139 65.7592 72.4139 64.4141V57.4111C72.4139 56.066 73.488 54.9844 74.8236 54.9844H100.297C101.633 54.9844 102.707 56.066 102.707 57.4111V64.2061C102.707 65.5512 101.633 66.6328 100.297 66.6328C98.9616 66.6328 97.8876 65.5512 97.8876 64.2061V59.8379H77.2333V64.4141C77.2333 65.7592 76.1455 66.8408 74.8236 66.8408ZM40.5375 66.8408C39.2018 66.8408 38.1278 65.7592 38.1278 64.4141V57.4111C38.1278 56.066 39.2018 54.9844 40.5375 54.9844H66.0111C67.3468 54.9844 68.4208 56.066 68.4208 57.4111V64.2061C68.4208 65.5512 67.3468 66.6328 66.0111 66.6328C64.6755 66.6328 63.6014 65.5512 63.6014 64.2061V59.8379H42.9471V64.4141C42.9471 65.7592 41.8594 66.8408 40.5375 66.8408ZM31.725 66.6328C30.3893 66.6328 29.3153 65.5512 29.3153 64.2061V59.8379H26.286C24.9504 59.8379 23.8763 58.7562 23.8763 57.4111C23.8763 56.066 24.9504 54.9844 26.286 54.9844H31.725C33.0606 54.9844 34.1346 56.066 34.1346 57.4111V64.2061C34.1346 65.5512 33.0469 66.6328 31.725 66.6328ZM108.352 66.6328C107.017 66.6328 105.943 65.5512 105.943 64.2061V57.4111C105.943 56.066 107.017 54.9844 108.352 54.9844H113.791C115.127 54.9844 116.201 56.066 116.201 57.4111C116.201 58.7562 115.127 59.8379 113.791 59.8379H110.762V64.2061C110.762 65.5512 109.674 66.6328 108.352 66.6328Z"
                            fill="#D0D0D0" fill-opacity="0.48" />
                        <path
                            d="M116.821 73.4971H91.347C90.0114 73.4971 88.9374 72.4154 88.9374 71.0703V64.0674C88.9374 62.7223 90.0114 61.6406 91.347 61.6406C92.6827 61.6406 93.7567 62.7223 93.7567 64.0674V68.6436H116.821C118.156 68.6436 119.23 69.7252 119.23 71.0703C119.23 72.4154 118.143 73.4971 116.821 73.4971Z"
                            fill="#D0D0D0" fill-opacity="0.48" />
                    </svg>
                </el-form-item>
                <el-form-item class="submit-btn-box">
                    <el-button class="form-submit-btn" type="primary" @click="submitForm(ruleFormRef)">
                        发布
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <div class="goods">
            <div v-if="isSelf" class="addNewGoods" @click="dialogAddGoods = true">
                <el-icon color="rgba(152, 123, 91, 1)" size="27">
                    <Plus />
                </el-icon>
                <div>上新商品</div>
            </div>
            <el-dialog v-model="dialogShowGoods" draggable class="dialog-showGoods" title="发布商品">
                <div class="img-box-big">
                    <el-image class="img-big" :src="detailData.mediaList[0].url"
                        :preview-src-list="detailData.mediaList.map(item => item.url)" fit="cover" @click.stop="" />
                </div>
                <div class="content-big">
                    <div class="header-big">
                        <div class="title-big" :class="{ 'title-down': !detailData.stock }">{{ detailData.name }}</div>
                        <div class="views-big">{{ detailData.views }}人看过</div>
                    </div>
                    <div class="description-big">
                        <span v-if="detailData.description">{{ detailData.description }}</span>
                        <span v-else>暂无商品描述</span>
                    </div>
                    <div class="bottom-big">
                        <div class="link-big" :class="{ 'link-down': !detailData.stock }">
                            <span v-if="detailData.stock">点击跳转链接购买</span>
                            <span v-else>该商品已下架</span>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <div class="goods-container" v-for="(data, index) in goodsData" :key="index"
                @click="dialogShowGoods = true; handleDetailProject(index)">
                <div class="img-box">
                    <el-image class="img" :src="data.mediaList[0].url"
                        :preview-src-list="data.mediaList.map(item => item.url)" fit="cover" @click.stop="" />
                    <svg class="down-svg" v-if="isManage && data.stock" @click="handleDownGoods(index)" width="67"
                        height="23" viewBox="0 0 67 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.57377 0H67V23H0L4.57377 0Z" fill="#B35C5C" />
                        <path
                            d="M8.33008 6.24365H20.6699V7.28467H14.5V10.0522L15.084 9.23975C17.0221 10.3823 18.6471 11.4106 19.959 12.3247L19.21 13.353C17.8981 12.3459 16.3281 11.2837 14.5 10.1665V17.6187H13.3447V7.28467H8.33008V6.24365ZM33.8223 16.1841C33.5091 16.5311 33.2467 16.8527 33.0352 17.1489C30.9277 16.4295 29.2435 15.306 27.9824 13.7783V17.7456H27.0176V13.7593C25.5957 15.3081 23.8945 16.4888 21.9141 17.3013C21.7194 17.0474 21.474 16.7596 21.1777 16.438C23.1032 15.7821 24.8086 14.8172 26.2939 13.5435H21.4062V12.6548H27.0176V11.2329H27.9824V12.6548H33.6572V13.5435H28.6616C30.0285 14.868 31.7487 15.7482 33.8223 16.1841ZM28.2871 6.25635H32.9082V11.2583H31.9688V10.6108H29.2266V11.2964H28.2871V6.25635ZM21.5713 6.59912H23.3994C23.4248 6.15902 23.4375 5.67236 23.4375 5.13916H24.377C24.377 5.66813 24.3664 6.15479 24.3452 6.59912H27.1953C27.153 7.76709 27.1064 8.71077 27.0557 9.43018C27.0049 10.2004 26.8568 10.7166 26.6113 10.979C26.3913 11.2414 25.9681 11.3726 25.3418 11.3726C25.0879 11.3726 24.7578 11.3683 24.3516 11.3599C24.2923 11.0213 24.2204 10.7039 24.1357 10.4077C24.6351 10.4585 25.0202 10.4839 25.291 10.4839C25.7819 10.4839 26.0485 10.2173 26.0908 9.68408C26.1585 8.84619 26.2051 8.10563 26.2305 7.4624H24.2817C24.2098 9.23975 23.4163 10.7505 21.9014 11.9946C21.7067 11.7661 21.4613 11.5334 21.165 11.2964C22.4769 10.3146 23.1963 9.03662 23.3232 7.4624H21.5713V6.59912ZM31.9688 7.11963H29.2266V9.74756H31.9688V7.11963ZM35.2188 9.27783H38.3037C38.0117 8.85042 37.6943 8.42725 37.3516 8.0083L38.126 7.48779C38.5322 7.96175 38.9004 8.40186 39.2305 8.80811L38.5449 9.27783H41.4268C41.8542 8.7277 42.2477 8.14795 42.6074 7.53857L43.5723 8.09717C43.1702 8.57536 42.8317 8.96891 42.5566 9.27783H45.7178V15.9302C45.7178 16.9966 45.2311 17.534 44.2578 17.5425C43.7331 17.5509 43.1406 17.5467 42.4805 17.5298C42.4128 17.0389 42.3493 16.6834 42.29 16.4634C42.9587 16.5311 43.5088 16.5649 43.9404 16.5649C44.4906 16.5649 44.7656 16.2603 44.7656 15.6509V10.1538H36.1709V17.6948H35.2188V9.27783ZM37.9609 16.438V12.3501H43.0518V15.7651H38.875V16.438H37.9609ZM34.292 6.56104H40.0874C39.9266 6.26058 39.7298 5.92627 39.4971 5.55811L40.4746 5.11377C40.7285 5.54964 40.9951 6.03206 41.2744 6.56104H46.7461V7.4624H34.292V6.56104ZM42.1377 14.9526V13.1626H38.875V14.9526H42.1377ZM38.9385 10.2935L39.624 10.9536C38.6338 11.8 37.707 12.5448 36.8438 13.188C36.5898 12.841 36.391 12.5913 36.2471 12.439C37.1781 11.8211 38.0752 11.106 38.9385 10.2935ZM41.1729 10.9917L41.7314 10.2935C42.984 11.0806 43.932 11.7111 44.5752 12.1851L43.9404 12.9849C43.1025 12.3078 42.18 11.6434 41.1729 10.9917ZM49.1201 5.74854H57.8799V10.7759H56.8643V10.3696H50.1357V10.7759H49.1201V5.74854ZM54.2871 11.8169H59.1367V17.6821H58.1719V16.8188H55.252V17.6821H54.2871V11.8169ZM47.876 11.8169H52.7129V17.6821H51.748V16.8315H48.8408V17.6821H47.876V11.8169ZM56.8643 6.63721H50.1357V9.48096H56.8643V6.63721ZM58.1719 12.7056H55.252V15.9937H58.1719V12.7056ZM51.748 12.7056H48.8408V15.9683H51.748V12.7056Z"
                            fill="white" />
                    </svg>
                </div>
                <div class="content">
                    <div class="header">
                        <div class="title" :class="{ 'title-down': !data.stock }">{{ data.name }}</div>
                        <div class="views">{{ data.views }}人看过</div>
                    </div>
                    <div class="description">
                        <span v-if="data.description">{{ data.description }}</span>
                        <span v-else>暂无商品描述</span>
                    </div>
                    <div class="bottom">
                        <div class="link" :class="{ 'link-down': !data.stock }">
                            <span v-if="data.stock">点击跳转链接购买</span>
                            <span v-else>该商品已下架</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tip">
            <span v-if="goodsData.length != 0">已展示全部商品</span>
            <span v-else>暂无商品</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router';
import * as User from '@/axios/api/user'
import * as Self from '@/axios/api/self'
import * as shop from '@/axios/api/workShop'
import ImageUpload from '../slot/ImageUpload.vue';
import { watch } from 'vue';

const { userId } = defineProps<{
    userId?: string
}>()

const isSelf = computed(() => Boolean(!userId))

const user = ref();

const dialogAddGoods = ref(false);

const goodsData = ref([]);

const isManage = ref(false); // 管理商品

function handleCloseAddGoods() { // 关闭添加商品弹窗
    if (ruleForm.describe === '' && ruleForm.link === '' && ruleForm.name === '' && fileList.value.length === 0) {
        dialogAddGoods.value = false;
        return;
    }
    ElMessageBox.confirm(
        '<span style="color: rgba(0, 0, 0, 0.5); font-size: 18px">退出后已填写信息不会保留</span>',
        '已填写部分信息，确认要退出吗？',
        {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            center: true,
            showClose: false,
            customClass: 'confirm-cancel-addGoods'
        }
    ).then(() => {
        dialogAddGoods.value = false;
        ruleFormRef?.value.resetFields();
        fileList.value = [];
    }).catch(() => {
        return;
    })

}

function handleDownGoods(index) { // 下架商品
    ElMessageBox.confirm(
        '确认下架该商品？',
        {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
        }
    ).then(() => {
        goodsData.value[index].stock = false;
        let element = goodsData.value[index];
        goodsData.value.splice(index, 1);
        goodsData.value.push(element);
        shop.downGoodsApi(element.id).then(res => {
            ElMessage.success('商品下架成功');
        }).catch(() => {
            ElMessage.error('商品下架失败');
            return;
        })
    }).catch(() => {
        return;
    })
}

onMounted(() => {
    if (isSelf) {
        Self.getSelf().then(r => user.value = r.data.data)
    } else {
        shop.getUserApi(userId).then(res => { //获取用户头像名字
            user.value = res.data.data
        })
    }
    if (isSelf.value) {
        shop.getMyGoodsApi().then(res => {
            goodsData.value = res.data.data;
            console.log(res.data.data);
        })
    } else {
        shop.getOtherGoodsApi(userId).then(res => {
            goodsData.value = res.data.data
        })
    }
})

//uploader
const fileList = ref<string[]>([]);

//form
const ruleFormRef = ref<FormInstance>();
const rows = window.innerHeight / 55;
const nameRule = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请填写商品名称'))
    } else callback();
}

const linkRule = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请填写商品链接'))
    } else callback();
}

const imgRule = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
        callback(new Error('请上传商品图片'))
    } else callback();
}

const ruleForm = reactive({
    img: [],
    name: '',
    link: '',
    describe: ''
})

watch(fileList, () => ruleForm.img = fileList.value)

const rules = reactive<FormRules<typeof ruleForm>>({
    name: [{ validator: nameRule, trigger: 'blur' }],
    link: [{ validator: linkRule, trigger: 'blur' }],
    img: [{ validator: imgRule, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => { // 发布商品
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            ElMessageBox.confirm(
                '<span style="color: rgba(0, 0, 0, 0.5); font-size: 20px">发布商品后不可修改</span>',
                '确认发布商品？',
                {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    center: true,
                    showClose: false,
                    customClass: 'confirm-addGoods'
                }
            ).then(() => {
                const mediaList = fileList.value.map(url => ({ url }))
                shop.postGoodsApi(ruleForm.name, ruleForm.link, ruleForm.describe, mediaList).then(res => {
                    ElMessage.success('商品发布成功')
                    dialogAddGoods.value = false;
                })
                console.log(ruleForm.img);
            }).catch(() => {
                return;
            })

        }
    })
}

//details dialog
const dialogShowGoods = ref(false);

const detailData = ref();

function handleDetailProject(index) {
    detailData.value = goodsData.value[index];
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    min-height: 100vh;
    padding: 0 20px;
    background-image: url('/icon/workShop.jpg');
    background-size: 100% auto;
    background-attachment: fixed;
    background-position: center top;
}

.back-btn {
    margin: 15px 0 15px 0;
}

.avatar {
    display: flex;
    align-items: center;
    gap: 10px;
}

.nickname {
    font-size: 20px;
}

.manage-btn {
    width: 70px;
    height: 27px;
    position: absolute;
    margin-right: 20px;
    font-size: 14px;
    color: #000;
    padding: 1px 5px;
    border-radius: 7px;
    border-color: rgba(152, 123, 91, 1);
    background-color: transparent;
    right: 0;
}

/*dialog*/
.dialog-addGoods {
    padding: 0 20px;
}

:deep(.el-dialog__header.show-close) {
    padding: 0;
    text-align: center;
}

:deep(.el-dialog__headerbtn) {
    width: 25px;
    height: 25px;
    left: 0;
    font-size: 25px;
    margin: 15px 0 0 15px;
}

:deep(.el-dialog__title) {
    font-size: 20px;
}

:deep(.el-dialog__headerbtn .el-dialog__close) {
    color: #000;
}

.goods-title-icon {
    text-align: center;
}

.goods {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.addNewGoods {
    width: 150px;
    height: 190px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: rgba(152, 123, 91, 1);
    border: dashed 2px rgba(177, 151, 128, 1);
}

/*uploader*/
.upload {
    margin-top: 1vh;
}

:deep(.el-upload--picture-card),
:deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 120px;
    height: 120px;
    border: solid 1px rgba(177, 151, 128, 1);
    background-color: rgb(255, 255, 255);
}

.upload-img .el-upload-list__item-thumbnail {
    object-fit: cover;
}

.el-icon.uploader-icon {
    font-size: 28px;
    color: rgba(177, 151, 128, 1);
    text-align: center;
}

.upload .el-icon svg {
    color: rgba(177, 151, 128, 1);
}

/*form*/
.goods-form {
    margin-top: 20px;
}

:deep(.small-input .el-input__wrapper) {
    box-shadow: none;
    border-bottom: solid 1px rgba(177, 151, 128, 0.5);
    border-radius: 0;
}

.small-form {
    margin-bottom: 15px;
}

.big-form {
    margin-top: 30px;
    position: relative;
}

:deep(.big-input .el-textarea__inner) {
    background-color: rgba(230, 230, 230, 0.61);
    z-index: 2;
}

.big-svg {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
    width: 141px;
    height: 142px;
}

.submit-btn-box {
    margin: 0;
}

:deep(.submit-btn-box .el-form-item__content) {
    justify-content: flex-end;
}

.form-submit-btn {
    width: 103px;
    height: 45px;
    font-size: 24px;
}

/*goods*/
.goods-container {
    width: 150px;
    height: 190px;
    border: solid 1px rgba(177, 151, 128, 1);
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.tip {
    margin-top: 20px;
    padding-bottom: 10px;
    text-align: center;
}

.img-box {
    position: relative;
}

.img {
    width: 100%;
    aspect-ratio: 16 / 9;
}

.down-svg {
    position: absolute;
    top: 0;
    right: 0;
}

.content {
    padding: 0 10px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
}

.title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(152, 123, 91, 1);
}

.title-down {
    color: rgba(151, 151, 151, 1);
    text-decoration: line-through;
}

.views {
    font-size: 11px;
    white-space: nowrap;
    color: rgba(151, 151, 151, 1);
}

.description {
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(151, 151, 151, 1);
    margin-bottom: 10px;
}

.bottom {
    text-align: center;
}

.link {
    font-size: 13px;
    color: #fff;
    padding: 5px 5px;
    border-radius: 7px;
    background-color: rgba(201, 136, 78, 0.6);
}

.link-down {
    background-color: rgba(151, 151, 151, 1);
}

/*big-goods*/
.dialog-showGoods{
    // width: 350px;
    // aspect-ratio: 4 / 5;
    // margin: 0 !important;
    // border: solid 1px rgba(177, 151, 128, 1);
    // box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.1);
    // background-color: #fff;
    background-color: aqua !important;
}

.tip {
    margin-top: 20px;
    padding-bottom: 10px;
    text-align: center;
}

.img-box {
    position: relative;
}

.img {
    width: 100%;
    aspect-ratio: 16 / 9;
}

.down-svg {
    position: absolute;
    top: 0;
    right: 0;
}

.content {
    padding: 0 10px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
}

.title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(152, 123, 91, 1);
}

.title-down {
    color: rgba(151, 151, 151, 1);
    text-decoration: line-through;
}

.views {
    font-size: 11px;
    white-space: nowrap;
    color: rgba(151, 151, 151, 1);
}

.description {
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(151, 151, 151, 1);
    margin-bottom: 10px;
}

.bottom {
    text-align: center;
}

.link {
    font-size: 13px;
    color: #fff;
    padding: 5px 5px;
    border-radius: 7px;
    background-color: rgba(201, 136, 78, 0.6);
}

.link-down {
    background-color: rgba(151, 151, 151, 1);
}
</style>