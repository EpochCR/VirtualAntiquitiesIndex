/**
 * @file VirtualAntiquitiesIndex.sol
 * @author Justin Chase <justin@EpochCR.com>
 * @version 0.2
 * @date 2/27/2019
 * @website TBD
 *
 * @section LICENSE
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of
 * the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details at
 * https://www.gnu.org/copyleft/gpl.html
 *
 * @section DESCRIPTION
 *
 * VirtualAntiquitiesIndex(VAI) Ethereum Contract: Enables Virtual Indexing of Antiquities with cryptographic proof of
 * ownership. VAI enables Antiquities owners to digitally: exchange ownership, sell ownership, and track provenance
 * and ownership of Antiquities. VAI gives owners a way to prove ownership of specific antiquities via cryptographic proof.
 */
pragma solidity >=0.4.21 <0.6.0;

import "./owned.sol";

contract VirtualAntiquitiesIndex is owned {

    struct AntiquityOwner{
        string ownerName;
        address controllerAddress;
        string contactInformation;
        string registrationDate;
        uint256 lastBlockUpdated;
    }

    string public welcomeMessage = "Welcome to the Virtual Antiquities Index (VAI)!";
    uint256 public numberAntiques = 0;
    uint256 public numberOwners = 0;

    struct Antiquity {
        string antiquityName; // Name of the antiquity
        string description; // Description of the antiquity
        string imageLink; // Link to image of antiquity
        string artist; // Name of antiquity Creator
        string antiquityDate; // Date or date range when antiquity was created
        uint256 lastUpdatedTimestamp; // The time at which the Mint was created
        address antiquityOwner; // Owner of the Antiquity
    }

    struct Provenance {
        string ownerName;
        string description;
        string date;
        string link;
    }

    mapping(address => AntiquityOwner) public antiquitiesOwners; // Mapping of addresses to AntiquityOwner
    mapping(uint256 => Antiquity) public antiquities; // Mapping of addresses to AntiquityOwner

    constructor() public {
    }

    function createAntiquityOwner(string memory ownerName, address controllerAddress, string memory contactInformation,
        string memory registrationDate) onlyOwner public {
        AntiquityOwner memory newOwner = AntiquityOwner(ownerName, controllerAddress,
            contactInformation, registrationDate,  block.number);
        antiquitiesOwners[controllerAddress] = newOwner;
        numberOwners+=1;
        delete newOwner;
    }

    function createAntiquity(string memory antiquityName, string memory description, string memory imageLink,
        string memory artist, string memory antiquityDate, address antiquityOwner) onlyOwner public {
        Antiquity memory newAntiquity = Antiquity(antiquityName, description, imageLink, artist, antiquityDate,
            block.timestamp, antiquityOwner);
        antiquities[numberAntiques] = newAntiquity;
        numberAntiques += 1;
        delete newAntiquity;
    }
}
