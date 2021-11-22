import FormInput from "../components/FormInput";
import Card from "../components/Card";
import Button from "../components/Button";


const ProfilePage = () => {

    const profile = {
        firstName: "MockFirstName",
        lastName: "MockLastName",
        mailingAddress: "MockMailingAddress",
        billingAddress: "MockBillingAddress",
        phone: "MockPhoneNumber",
        email: "MockEmail"
    }

    return (
        <Card>
            <div>{profile.firstName}</div>
            <div>{profile.lastName}</div>
            <div>{profile.mailingAddress}</div>
            <div>{profile.billingAddress}</div>
            <div>{profile.email}</div>
            <div>{profile.number}</div>
        </Card>
    );
}

export default ProfilePage;