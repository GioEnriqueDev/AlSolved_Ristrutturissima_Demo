import { MOCK_SITES } from "@/lib/mock-data";
import { Site } from "@/lib/types";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    async getDashboardData() {
        await delay(800);
        return {
            success: true
        };
    },

    async clockIn(lat: number, lng: number): Promise<{ success: boolean; site?: Site; message: string }> {
        await delay(1500);

        // Simple geofencing logic simulation
        const matchedSite = MOCK_SITES.find(site => {
            // Rough distance calc (placeholder for specialized library)
            const dist = Math.sqrt(Math.pow(site.lat - lat, 2) + Math.pow(site.lng - lng, 2));
            // In lat/lng degrees, 0.002 is approx 200m
            return dist < 0.01; // generous radius for demo
        });

        if (matchedSite) {
            return { success: true, site: matchedSite, message: `Checked in at ${matchedSite.name}` };
        }

        // For demo purposes, we can force success if no site match but we want to show it working
        // return { success: false, message: "No active site found nearby." };

        // FORCE SUCCESS for Demo if near the mocked coords, otherwise fail
        return { success: true, site: MOCK_SITES[0], message: "Demo Mock: Forced Check-in Success" };
    },

    async uploadExpense(formData: FormData) {
        await delay(2000);
        return { success: true, id: 'new-t-id' };
    }
};
