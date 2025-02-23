import { cookies } from "next/headers";

export default function getToken() {
    return cookies().get('CASHTRAKR-TOKEN')?.value
}