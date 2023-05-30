import React, { useCallback, useEffect, useState } from "react";

import { PostItem } from "../../common/posts/PostItem";
import { useParams } from "react-router-dom";
import { fetchUsersPosts } from "../../api/users.api";
import { CardGroup } from "reactstrap";
import { groupMyArray } from "../../helpers";

const UserPosts = () => {
  let { id } = useParams();
  const [state, setState] = useState<{
    isLoading: boolean;
    data: any[];
    error: string;
    hideIds: any[];
  }>({
    isLoading: true,
    data: [],
    error: "",
    hideIds: [],
  });

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      let data: any = await fetchUsersPosts(id);
      data = groupMyArray(3)(data);

      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        data,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: "Error",
      }));
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleHide = useCallback((id: any) => {
    setState((prevState) => ({
      ...prevState,
      hideIds: prevState.hideIds.includes(id)
        ? prevState.hideIds.filter(id)
        : [...prevState.hideIds].concat(id), // in case we need toggle effect
    }));
  }, []);

  if (state.error) return <h1>{state.error}</h1>;
  return (
    <>
      {state.data.map((item: any) => (
        <CardGroup>
          {item.map(
            (i: any) =>
              !state.hideIds.includes(i.id) && (
                <PostItem
                  key={`posts-${i.id}`}
                  data={i}
                  handleHide={handleHide}
                />
              )
          )}
        </CardGroup>
      ))}
    </>
  );
};
export default UserPosts;
