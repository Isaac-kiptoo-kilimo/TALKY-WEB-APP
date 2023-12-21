import { addCommentController, createPostControllers, createReplyController, deleteCommentControllers, deletePostController, updateCommentControllers, updatePostController } from "./postsControllers";

jest.mock("../dphelpers/dpHelpers", () => ({
  execute: jest.fn(),
  query: jest.fn(),
}));

describe("should create a comment", () => {
  it("should create a comment", async () => {
    const req: any = {
      body: {
        content: "wonderful",
        userID: "User123",
        postID: "Post123",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await addCommentController(req, res);

    expect(res.send).toHaveBeenCalledWith({
      message: "comment created successfully",
    });
  });

  it("should edit a comment", async () => {
    const req: any = {
      body: {
        commentID: "comment123",
        content: "hello World. 10 days from 2024",
        userID: "User123",
        postID: "Post123",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await updateCommentControllers(req, res);

    //  expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Comment updated successfully",
    });
  });

  it("should delete a comment", async () => {
    const req: any = {
      params: {
        ID: "comment123",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await deleteCommentControllers(req, res);

    //  expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "comment deleted Successfully",
    });
  });

  it("should reply a comment", async () => {
    const req: any = {
      body: {
        text: "nice one",
        userID: "User123",
        postID: "Post123",
        CommentID: "Comment123",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await createReplyController(req, res);

    expect(res.send).toHaveBeenCalledWith({
      message: "Reply to the comment created successfully",
    });
  });

  it("should delete a post", async () => {
    const req: any = {
      params: {
        postID: "2666yduiisooo",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await deletePostController(req, res);

    //  expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Post deleted successfully",
    });
  });

  it("should update a post", async () => {
    const req: any = {
      body: {
        postImage: "[https://image.12345]",
        userID: "User123",
        caption: "This is my post",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await updatePostController(req, res);

    expect(res.send).toHaveBeenCalledWith({
      message: "Post updated successfully",
    });
  });

  it("should create a post", async () => {
    const req: any = {
      body: {
        postImage: "[https://imageUrl.1234]",
        caption: "amazing staff",
        userID: "User345776",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await createPostControllers(req, res);

    expect(res.send).toHaveBeenCalledWith({
      message: "post created successfully",
    });
  });
});