import React from "react"
import Resources from "../components/Resources"
import SearchBar from "../components/SearchBar"


function ResourcesPage() {
    return (
        <div>
            <div className="resources-intro">
                <br />
                <br />
                <h2 className="resources-h2">Find Your Calling</h2>
                <h4>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br />
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in <br />
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa <br />
                    qui officia deserunt mollit anim id est laborum."
                </h4>
            </div>
            <br />
            <br />
            <div className="search-resource">
                <h4>Search</h4>
                <SearchBar />
            </div>
            <Resources />

            <h2>HIGH SCHOOL</h2>

            <h2>COLLEGE</h2>

            <h2>CONTINUING EDUCATION FOR ADULTS</h2>
        </div>
    )
}

export default ResourcesPage