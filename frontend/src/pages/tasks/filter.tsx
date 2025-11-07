import { useState, useCallback, type ChangeEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { statuses, priorities } from "../../constants";
import type { Params } from "../../types";
import { debounce } from "../../utils";

const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState<Params>({})
    const [search, setSearch] = useState<string>('')

    // Restore search params
    useEffect(() => {
        setFilter({ priority: searchParams.get('priority') ?? '', status: searchParams.get('status') ?? '' });
        const search = searchParams.get('search') ?? '';
        if (search) {
            setSearch(search);
        }
    }, [searchParams])

    const onField = useCallback(
        (e: ChangeEvent<HTMLSelectElement>, name: string) => {
            const { value } = e.target;
            setFilter((oldVal: Params) => ({ ...oldVal, [name]: value }));
        },
        []
    );

    const onSearch = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setSearchParams(value ? { search: value } : {});
        },
        [setSearchParams]
    );

    const onClearFilter = useCallback(() => {
        setFilter({})
        setSearch('');
        setSearchParams({});
    }, [setSearchParams])

    const onFilter = useCallback(() => {
        const { priority, status } = filter;
        const param: Params = {};
        if (priority) {
            param.priority = priority;
        }
        if (status) {
            param.status = status;
        }
        setSearch('');
        setSearchParams(param);
    }, [filter, setSearchParams])



    return (<tr>
        <td>
            <section className="search-wrapper">
                <input
                    type='text'
                    placeholder="Search by title"
                    className="search-input input"
                    onChange={debounce(onSearch, 500)}
                    defaultValue={search}
                />
                <select
                    className="input select"
                    onChange={(e) => onField(e, "status")}
                    value={filter?.status}
                >
                    <option value="" disabled>
                        Select status
                    </option>
                    {statuses.map((sta: string) => (
                        <option key={sta} value={sta}>
                            {sta}
                        </option>
                    ))}
                </select>
                <select
                    className="select input"
                    value={filter?.priority}
                    onChange={(e) => onField(e, "priority")}
                >
                    <option value="" disabled>
                        Select priority
                    </option>
                    {priorities.map((pr: string) => (
                        <option key={pr} value={pr}>
                            {pr}
                        </option>
                    ))}
                </select>

            </section>
            <section className="search-wrapper">
                <button type='button' onClick={onFilter} disabled={!filter.priority && !filter.status}>
                    Filter
                </button>
                <button type='button' onClick={onClearFilter} disabled={!filter.priority && !filter.status}>
                    Reset
                </button>
            </section>
        </td>
    </tr>)
}

export default Filter;