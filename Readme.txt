keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

JKS keystore uses a proprietary format. It is recommended to migrate to PKCS12
keytool -importkeystore -srckeystore debug.keystore -destkeystore debug.keystore -deststoretype pkcs12

Keystore name: "debug.keystore"
Keystore password: "android"
Key alias: "androiddebugkey"
Key password: "android"