address 0xb07a341a22ce8cc6374004e20598e9889e9efc4d10f068c7dbcb60dfd578333f {
module PropertyManager {
    use std::vector;
    use std::signer;

    struct Property has key, store, copy, drop {
        title: vector<u8>,
        description: vector<u8>,
        price: u64,
    }

    struct Properties has key, store {
        user_properties: vector<Property>,
    }

    /// Create a new property for the user's account
    public entry fun create_property(
        account: &signer,
        title: vector<u8>,
        description: vector<u8>,
        price: u64
    ) acquires Properties {
        let user_addr = signer::address_of(account);

        // Ensure Properties resource exists for the account, create it if not
        if (!exists<Properties>(user_addr)) {
            move_to(account, Properties {
                user_properties: vector::empty<Property>(),
            });
        };

        // Add a new property to the user's Properties resource
        let properties = borrow_global_mut<Properties>(user_addr);
        vector::push_back(&mut properties.user_properties, Property {
            title,
            description,
            price,
        });
    }

    /// Update the price of a property with the given title
    public entry fun update_property_price(
        account: address,
        title: vector<u8>,
        new_price: u64
    ) acquires Properties {
        // Ensure Properties exists for the given address
        if (!exists<Properties>(account)) {
            abort 0x1; // Properties resource does not exist
        };

        // Borrow the Properties resource
        let properties = borrow_global_mut<Properties>(account);

        // Find the property with the given title
        let len = vector::length(&properties.user_properties);
        let i = 0;
        while (i < len) {
            let property = vector::borrow_mut(&mut properties.user_properties, i);
            if (property.title == title) {
                property.price = new_price;
                return;
            };
            i = i + 1;
        };

        // If no matching property is found, abort
        abort 0x2; // Property with the given title not found
    }

    /// Remove a property with the given title
    public entry fun remove_property(
        account: address,
        title: vector<u8>
    ) acquires Properties {
        // Ensure Properties exists for the given address
        if (!exists<Properties>(account)) {
            abort 0x1; // Properties resource does not exist
        };

        // Borrow the Properties resource
        let properties = borrow_global_mut<Properties>(account);

        // Find the property with the given title and remove it
        let len = vector::length(&properties.user_properties);
        let i = 0;
        while (i < len) {
            let property = vector::borrow(&properties.user_properties, i);
            if (property.title == title) {
                vector::swap_remove(&mut properties.user_properties, i);
                return;
            };
            i = i + 1;
        };

        // If no matching property is found, abort
        abort 0x2; // Property with the given title not found
    }

    /// Retrieve all properties associated with the user's account
    public fun get_properties(account: address): vector<Property> acquires Properties {
        // Check if Properties exists for the given address
        if (!exists<Properties>(account)) {
            // Return an empty vector if no properties exist
            return vector::empty<Property>();
        };

        // Borrow the Properties resource
        let properties = borrow_global<Properties>(account);

        // Return all user properties
        properties.user_properties
    }
}
}