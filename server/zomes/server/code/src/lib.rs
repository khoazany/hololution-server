#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;

use hdk::{
    error::ZomeApiResult,
};
use hdk::holochain_core_types::{
    cas::content::Address, entry::Entry, dna::entry_types::Sharing, error::HolochainError, json::JsonString,
};

define_zome! {
    entries: [
        entry!(
            name: "resource",
            description: "",
            sharing: Sharing::Public,
            native_type: Resource,
            validation_package: || hdk::ValidationPackageDefinition::Entry,
            validation: |_resource: Resource, _validation_data: hdk::ValidationData| {
                Ok(())
            }
        )
    ]

    genesis: || { Ok(()) }

    functions: [
        create_resource: {
            inputs: |entry: Resource|,
            outputs: |result: ZomeApiResult<Address>|,
            handler: handle_create_resource
        }
        get_resource: {
            inputs: |address: Address|,
            outputs: |result: ZomeApiResult<Option<Entry>>|,
            handler: handle_get_resource
        }
    ]

    traits: {
        hc_public [create_resource,get_resource]
    }
}

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct Resource {
    content: String,
}


pub fn handle_create_resource(entry: Resource) -> ZomeApiResult<Address> {
    let entry = Entry::App("resource".into(), entry.into());
    let address = hdk::commit_entry(&entry)?;
    Ok(address)
}

pub fn handle_get_resource(address: Address) -> ZomeApiResult<Option<Entry>> {
    hdk::get_entry(&address)
}
