import axios from "axios";

type Props = {
    formData: FormData;
};

const pinata = async function ({ formData }: Props): Promise<string> {
    try {
        const { data } = await axios.post(process.env.PINATA_RPC_URL!, formData, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData}`,
                Authorization: process.env.PINATA_API_KEY!,
            },
        });
        return "ipfs://" + data.IpfsHash;
    } catch (error) {
        return "";
    }
};

export default pinata;
