<script setup lang="ts">
import {MetaMaskSDK} from "@metamask/sdk";
import detectEthereumProvider from '@metamask/detect-provider'

const provider = ref()
const chainId = ref()
const account = ref()
const connected = ref()
const lastResponse = ref()
const sdk = new MetaMaskSDK({
    dappMetadata: {
        url: window.location.href,
        name: 'MetaMask VueJS Example Dapp',
    },
    enableDebug: true,
    // useDeeplink: true,
    //enableAnalytics: true,
    checkInstallationImmediately: false,
    logging: {
        developerMode: true,
    },
    i18nOptions: {
        enabled: true,
    },
})
sdk.init()

async function getProvider() {
    await sdk?.init()
    provider.value = await detectEthereumProvider();
    chainId.value = provider.value.chainId;

    // Chain changed
    provider.value?.on('chainChanged', (chain: any) => {
        console.log(`App::Chain changed:'`, chain);
        chainId.value = chain;
    });

    // Accounts changed
    provider.value?.on('accountsChanged', (accounts: any[]) => {
        console.log(`App::Accounts changed:'`, accounts);
        account.value = accounts[0];
    });

    // Connected event
    provider.value?.on('connect', (_connectInfo: any) => {
        console.log(`App::connect`, _connectInfo);
        onConnect();
        connected.value = true;
    });

    // Disconnect event
    provider.value?.on('disconnect', (error: any) => {
        console.log(`App::disconnect`, error);
        connected.value = false;
    });

    //this.availableLanguages = this.sdk?.availableLanguages ?? ['en'];

}

onMounted(async () => {
    console.log('Mounted')
    await getProvider()
})

async function onConnect() {
    try {
        if (!provider.value) await getProvider()
        const res = await provider.value.request({
            method: 'eth_requestAccounts',
            params: [],
        });
        account.value = res[0];
        console.log('request accounts', res);
        lastResponse.value = '';
    } catch (e) {
        console.log('request accounts ERR', e);
    }
}

function terminate() {
    sdk?.terminate();
    account.value = null;
    lastResponse.value = 'Terminated!';
    chainId.value = null;
}


async function sendTransaction() {
    if(!connected.value) await onConnect()
    const to = '0x470a6aa7110e799cf3978930fef25569d162babc';
    const transactionParameters = {
        to, // Required except during contract publications.
        from: provider.value.selectedAddress, // must match user's active address.
        value: '0x5AF3107A4000', // Only required to send ether to the recipient from the initiating external account.
    };

    try {
        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await provider.value.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        lastResponse.value = txHash;
    } catch (e) {
        console.log(e);
    }
}
</script>

<template lang="pug">
div
    p Connected chain: {{ chainId }}
    p Connected account:{{ account }}
    p Last response: {{ lastResponse }}
    p Connected: {{ connected }}
    v-btn(@click="onConnect") Connect
    v-btn(@click="sendTransaction") Send
    v-btn(@click="terminate") terminate
//Metamask
</template>

<style scoped lang="sass">

</style>