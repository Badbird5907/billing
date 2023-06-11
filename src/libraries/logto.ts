import LogtoClient from '@logto/next';
import {config} from "@/libraries/config";

export const logtoClient = new LogtoClient(config);
