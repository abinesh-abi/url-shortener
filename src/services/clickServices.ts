import { Clicks, IClicks } from "../models/click.model";

export default {
    createClick: async (data: IClicks): Promise<IClicks> => {
        const click = new Clicks(data);
        return await click.save();

    }
}


