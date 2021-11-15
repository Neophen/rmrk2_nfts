<script setup lang="ts">
import BaseCard from './components/BaseCard.vue';
import BaseFieldText from './components/BaseFieldText.vue';
import BaseButton from './components/BaseButton.vue';

const pinataApiKey = '314ebec5d40ff2a0fe54';
const pinataSecretApiKey =
  'b4c9d9cd0b520b62ce8423e2d71508617d7b98a91ed7ae98664a059fba873106';

const addressCID = ref('QmQUA3DJ5fyGxiXeesTpRxLK8QkkB2Tefb4C1GLdbz2UJn');
const data = ref('');

const fetchData = async () => {
  //   const address = 'https://gateway.pinata.cloud/ipfs/' + addressCID.value;
    // 'https://managed.mypinata.cloud/api/v1/content/QmQUA3DJ5fyGxiXeesTpRxLK8QkkB2Tefb4C1GLdbz2UJn/list?includepaths=true&offset=0&limit=50' \
//   const url = `https://api.pinata.cloud/data/pinList?hashContains=?${addressCID.value}`;
  const url = 'https://managed.mypinata.cloud/api/v1/content/QmQUA3DJ5fyGxiXeesTpRxLK8QkkB2Tefb4C1GLdbz2UJn/list?includepaths=true&offset=0&limit=50' ;
  console.log(url);
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });
  data.value = await response.json();
};
</script>
<template>
  <div class="p-8">
    <BaseFieldText v-model="addressCID" label="Pinata CID" id="cid" />
    <BaseButton @click="fetchData" :disabled="!addressCID"
      >Fetch data</BaseButton
    >
    <BaseCard>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </BaseCard>
  </div>
</template>
