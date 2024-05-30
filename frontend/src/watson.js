var g_wa_instance;
window.watsonAssistantChatOptions = {
  integrationID: "f92a3b8e-0c48-44e1-884b-0f0e8ceaf8b3",
  region: "us-south", // The region your integration is hosted in.
  serviceInstanceID: "7580a010-6685-47ba-b0ab-031943cd21d6",
  onLoad: function (instance) {
    g_wa_instance = instance;

    instance.on({
      type: "customResponse",
      handler: (event, instance) => {
        if (
          event.data.message.user_defined &&
          event.data.message.user_defined.user_defined_type ===
            "user-file-upload"
        ) {
          fileUploadCustomResponseHandler(event, instance);
        }
      },
    });

    instance.render();
  }
};