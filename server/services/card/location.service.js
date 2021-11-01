import locationRepository from '#repositories/card/location.repository';

class LocationService {
    async createLocation(locationTitle, locationType) {
        let location = await locationRepository.getOneLocationByTitle(locationTitle);
        if (!location) {
            location = await locationRepository.createLocation(locationTitle, locationType);
            location = await locationRepository.getOneLocationByTitle(locationTitle);
        }
        return location.toJSON();
    };
}

export default new LocationService();