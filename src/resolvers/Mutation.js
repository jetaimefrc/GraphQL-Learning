const Mutation = {
  async createUser(_, args, { prisma }) {
    const emailTaken = await prisma.exists.User({ email: args.data.email })
    if (emailTaken) {
      throw new Error('Email Taken !')
    }
    return await prisma.mutation.createUser({
      data: args.data,
    })
  },
  async deleteUser(_, args, { prisma }) {
    const userID = args.id
    const userExisted = await prisma.exists.User({
      id: userID,
    })
    if (!userExisted) {
      throw new Error('User not found !')
    }
    return prisma.mutation.deleteUser({
      where: {
        id: userID,
      },
    })
  },
  async updateUser(_, args, { prisma }) {
    const { id, data } = args
    const userExisted = await prisma.exists.User({ id })
    if (!userExisted) {
      throw new Error('User not found !')
    }
    const emailTaken = await prisma.exists.User({ email: data.email })
    if (emailTaken) {
      throw new Error('Email Taken')
    }
    return prisma.mutation.updateUser({
      where: {
        id,
      },
      data,
    })
  },
  /*
  Post
   */
  async createPost(_, args, { prisma }, info) {
    const { title, body, published, author } = args.data

    const newPost = {
      title,
      body,
      published,
      author: {
        connect: {
          id: author,
        },
      },
    }
    return prisma.mutation.createPost({ data: newPost, info })
  },
  async deletePost(_, args, { prisma }) {
    const postExists = await prisma.exists.Post({ id: args.id })
    if (!postExists) {
      throw new Error('Post not exist !')
    }
    return prisma.mutation.deletePost({
      where: {
        id: args.id,
      },
    })
  },
  async updatePost(_, args, { prisma }) {
    const { id, data } = args
    const postExists = await prisma.mutation.Posts({ id })
    if (!postExists) {
      throw new Error('Post not exist')
    }
    return prisma.mutation.updatePost({
      where: {
        id,
      },
      data,
    })
  },
  async createComment(_, args, { prisma }) {
    const { text, author, post } = args.data
    const userExisted = await prisma.exists.User({ id: author })
    const postExisted = await prisma.exists.Post({ id: post })
    if (!userExisted) {
      throw new Error('User not found !')
    }
    if (!postExisted) {
      throw new Error('Post not found !')
    }
    const newComment = {
      text: text,
      author: {
        connect: {
          id: author,
        },
      },
      post: {
        connect: {
          id: post,
        },
      },
    }
    return prisma.mutation.createComment(newComment)
  },
  async deleteComment(_, args, { prisma }) {
    const commentExisted = await prisma.exists.Comment({ id: args.id })
    if (!commentExisted) {
      throw new Error('Comment not found !')
    }
    return prisma.mutation.deleteComment({
      where: {
        id: args.id,
      },
    })
  },
  async updateComment(_, args, { prisma }) {
    const { id, data } = args
    const commentExisted = await prisma.exists.Comment({ id })
    if (!commentExisted) {
      throw new Error('Comment not found !')
    }
    return prisma.mutation.updateComment({
      where: {
        id,
      },
      data,
    })
  },
}

export { Mutation as default }
