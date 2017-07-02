export const EnvironmentConstant = {
    development: {
        HOST: "assets/stub",
        SAMPLE_GET_1: "posts",
        SAMPLE_POST_1: "posts",
        API_VERSION: "",
        AVATAR_IMAGE: "assets/img/person.png"
    },
    release: {
        HTTP_SUCCESS: "200",
        HTTP_BAD_REQUEST_ERROR: "400 - bad request",
        HTTP_UNAUTHORISED_ERROR: "401 - unauthorized",
        HTTP_FORBIDDEN_ERROR: "403 - forbidden",
        HTTP_NOT_FOUND_ERROR: "404 - not found",
        HTTP_INTERNAL_ERROR: "500 - internal server error",
        HOST: "http://witty-instance.7e14.starter-us-west-2.openshiftapps.com/api",
        //HOST: "https://witty-sudipta808.c9users.io/api",
        CATEGORY: "/category"
    },
    production: {
        
    }
};
