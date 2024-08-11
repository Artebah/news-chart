import React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { CreateRequestItem } from "./CreateRequestItem";
import { useFilterContext } from "../hooks/useFilterContext";

interface DndRequestsProps {
  isNewRequest: boolean;
  setIsNewRequest: any;
}

const DndRequests: React.FC<DndRequestsProps> = ({ isNewRequest, setIsNewRequest }) => {
  const { requestsFilter } = useFilterContext();

  React.useEffect(() => {
    if (isNewRequest) {
      const dndWrapper = document.querySelector(
        "[data-rbd-droppable-id='root-dnd-droppable-zone']"
      );

      if (dndWrapper) {
        setTimeout(() => {
          dndWrapper.scrollBy({
            top: dndWrapper.scrollHeight,
          });
        }, 0);
      }
    }
  }, [isNewRequest]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...requestsFilter.value];

      const sourceIndex = source.index;
      const destinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinatonIndex, 0, removedStore);

      return requestsFilter.setFilter(reorderedStores);
    }

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const itemSourceIndex = requestsFilter.value.findIndex(
      (item) => item.name === source.droppableId
    );
    const itemDestinationIndex = requestsFilter.value.findIndex(
      (item) => item.name === destination.droppableId
    );

    const newSourceItems = [...(requestsFilter.value[itemSourceIndex].list ?? [])];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...(requestsFilter.value[itemDestinationIndex].list ?? [])]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(sourceIndex, 1);
    newDestinationItems.splice(destinationIndex, 0, deletedItem);

    const newData = [...requestsFilter.value];

    newData[itemSourceIndex] = {
      ...requestsFilter.value[itemSourceIndex],
      list: newSourceItems,
    };
    newData[itemDestinationIndex] = {
      ...requestsFilter.value[itemDestinationIndex],
      list: newDestinationItems,
    };

    requestsFilter.setFilter(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* outer droppable zone */}
      <Droppable droppableId="root-dnd-droppable-zone" type="group">
        {(providedDroppable) => (
          <div {...providedDroppable.droppableProps} ref={providedDroppable.innerRef}>
            {requestsFilter.value.map((item, index) => (
              /* top-level filters and groups */
              <Draggable key={item.name} draggableId={item.name} index={index}>
                {(providedDraggable) => (
                  /* droppable zone for groups */
                  <Droppable droppableId={item.name}>
                    {(providedDroppable) => (
                      <div
                        {...providedDroppable.droppableProps}
                        ref={providedDroppable.innerRef}>
                        {/* filter or group */}
                        <CreateRequestItem
                          setIsNewRequest={setIsNewRequest}
                          isNewRequest={isNewRequest}
                          request={item}
                          dndProps={{
                            ref: providedDraggable.innerRef,
                            draggableProps: providedDraggable.draggableProps,
                            draggableButtonProps: providedDraggable.dragHandleProps,
                          }}
                        />

                        {providedDroppable.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </Draggable>
            ))}
            {providedDroppable.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export { DndRequests };
