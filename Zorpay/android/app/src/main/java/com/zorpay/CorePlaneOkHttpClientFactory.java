package com.zorpay;

import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.OkHttpClientFactory;
import okhttp3.OkHttpClient;

public class CorePlaneOkHttpClientFactory implements OkHttpClientFactory {
    public OkHttpClient createNewNetworkModuleClient() {
        return OkHttpClientProvider.createClientBuilder()
                .dns(new CorePlaneOkHttpDNSSelector(CorePlaneOkHttpDNSSelector.IPvMode.IPV4_FIRST))
                .build();
    }
}
