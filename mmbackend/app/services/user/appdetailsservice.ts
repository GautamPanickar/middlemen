import { AppUtils } from '../../utils/apputils';
import CustomException from '../../utils/exceptions/customexception';
import AppDetailsModel from '../../models/appdetailsmodel';
import AppDetails from '../../types/user/appdetails';


class AppDetailsService {
    private appDetails = AppDetailsModel;

    constructor() {
    }

    /**
     * Returns the app details for the given id.
     * @param id 
     */
    public async findById(id: string): Promise<AppDetails> {
        return this.appDetails.findById(id);
    }

    /**
     * Retutrns the app details for the given code.
     * @param code 
     */
    public async findByCode(code: string): Promise<AppDetails> {
        return this.appDetails.find({code: code});
    }

    /**
     * Saves the app details.
     * @param dto 
     */
    public async saveAppDetails(dto: AppDetails): Promise<AppDetails> {
        try {
            if (AppUtils.isEmpty(dto._id)) {
                // Creating new details for the app
                const newAppDetails: AppDetails = await this.appDetails.create({...dto});
                return newAppDetails;
            } else {
                // Updating an exisiting app data
                const detailsToUpdate: AppDetails = await this.findById(dto._id);
                if (detailsToUpdate) {
                    detailsToUpdate.name = dto.name;
                    detailsToUpdate.subdomain = dto.subdomain;
                    const model = new AppDetailsModel(detailsToUpdate);
                    const updatedAppDetails: AppDetails = await model.save();
                    return updatedAppDetails;
                } else {
                    throw new CustomException('Could not find the details for the app');
                }
            }
        } catch (error) {
            throw error;
        }
    }
}

export default AppDetailsService;
